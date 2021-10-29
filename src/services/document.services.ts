import { PrismaClient, Document, DocumentVersion, User } from "@prisma/client";
import Feedback from "../models/Feedback";
import DocumentUpload from "../models/interfaces/DocumentUpload.interface.";
import Pagination from "../models/Pagination";

const prisma = new PrismaClient();

export const createDocuments = async (
  rawDocuments: DocumentUpload[],
  userId: number,
  folderId: number | null
) => {
  let feedback = new Feedback<boolean>();
  let fid: any = folderId || null;

  for (let raw of rawDocuments) {
    // check if another copy already exists
    let sameCount = await prisma.documentVersion.count({
      where: { name: { startsWith: raw.name }, folderId },
    });

    try {
      let version = await prisma.documentVersion.create({
        data: {
          name: sameCount === 0 ? raw.name : `${raw.name} (Copy ${sameCount})`,
          size: raw.size,
          folderId: fid,
          userId,
          document: {
            create: {
              mimeType: raw.type,
              extension: raw.extension,
              url: raw.url,
              userId,
            },
          },
        },
      });
      // TODO:
      // register create activity
    } catch (error) {
      console.log(error);
      feedback.message += `Failed to save ${raw.name} `;
      feedback.success = false;
    }
  }
  return feedback;
};

export const createFolder = async (
  raw: any,
  userId: number
): Promise<Feedback<any>> => {
  let feedback = new Feedback<any>();
  try {
    // check if folder exists
    let exists = await prisma.documentVersion.findFirst({
      where: { name: raw.name, folderId: raw.folderId },
    });
    if (!exists) {
      let version = await prisma.documentVersion.create({
        data: {
          name: raw.name,
          folderId: raw.folderId,
          userId,
          document: {
            create: {
              isFolder: true,
              userId,
            },
          },
        },
      });

      let doc = await prisma.documentVersion.findFirst({
        where: { id: version.id },
        include: { document: true },
      });

      feedback.result = doc;

      // register activity
      await prisma.activity.create({
        data: {
          content: "created new folder",
          documentId: Number(doc?.document.id),
          userId: userId,
        },
      });
    } else {
      feedback.success = false;
      feedback.message = `${raw.name} already exists`;
    }
  } catch (error) {
    feedback.success = false;
    feedback.message = `Failed to create folder ${raw.name}`;
  }

  return feedback;
};

export const getDocuments = async (
  page: number,
  userId: number,
  folderId?: number,
  search?: string | undefined,
  isFolder?: boolean
) => {
  let pageSize = 20;
  let filter: any = {
    folderId: folderId || null,
    userId,
    isCurrent: true,
  };
  let feedback = new Feedback<any>();

  if (search) filter.name = { contains: search };
  if (isFolder) {
    filter.document = { isFolder };
  }
  try {
    let totalDocuments = await prisma.documentVersion.count({
      where: filter,
    });
    let pager = new Pagination(page, pageSize).getPager(totalDocuments);
    feedback.page = page;
    feedback.pages = pager.pages;

    feedback.results = await prisma.documentVersion.findMany({
      where: filter,
      take: pageSize,
      skip: pager.start,
      include: { document: true },
      orderBy: [{ document: { isFolder: "desc" } }, { name: "asc" }],
    });
  } catch (error) {
    console.log(error);
    feedback.success = false;
    feedback.message = "Failed to retrieve data";
  }

  return feedback;
};

export const getDocument = async (id: string) => {
  let feedback = new Feedback<any>();
  try {
    feedback.result = await prisma.documentVersion.findFirst({
      where: { id },
      include: { document: true },
    });
  } catch (error) {
    console.log(error);
    feedback.success = false;
    feedback.message = "Failed to retrieve document";
  }
  return feedback;
};

export const deleteDocuments = async (ids: string[], userId: number) => {
  let feedback = new Feedback<boolean>();
  try {
    let updates = [];
    let activites = [];
    for (let id of ids) {
      let version = await prisma.documentVersion.findFirst({ where: { id } });
      updates.push(
        prisma.documentVersion.update({
          data: {
            deletedAt: new Date(),
            isCurrent: false,
            document: {
              update: {
                deletedAt: Date(),
              },
            },
          },
          where: { id },
        })
      );
      activites.push({
        content: `deleted ${version?.name}.`,
        documentId: Number(version?.documentId),
        userId,
      });
    }

    await prisma.$transaction(updates);
    await prisma.activity.createMany({ data: activites });
  } catch (error) {
    feedback.success = false;
    feedback.message = "Failed to delete document";
  }
  return feedback;
};

const createNewVersion = async (
  version: DocumentVersion & { document: Document },
  folderId: number,
  isDuplicate = true
) => {
  let sameCount = await prisma.documentVersion.count({
    where: {
      name: { startsWith: version.name },
      folderId,
      isCurrent: true,
    },
  });

  let newVersion: any;

  if (isDuplicate) {
    newVersion = await prisma.documentVersion.create({
      data: {
        name:
          sameCount == 0
            ? `${version?.name}`
            : `${version?.name} (Copy ${sameCount})`,
        userId: Number(version?.userId),
        folderId: folderId,
        size: version?.size,
        isCurrent: true,
        document: {
          create: {
            extension: version.document.extension,
            mimeType: version.document.mimeType,
            isFolder: version.document.isFolder,
            url: version.document.url,
            userId: version.document.userId,
          },
        },
      },
    });
  } else {
    await prisma.documentVersion.update({
      data: { isCurrent: false },
      where: { id: version.id },
    });
    newVersion = await prisma.documentVersion.create({
      data: {
        name:
          sameCount == 0
            ? `${version.name}`
            : `${version.name} (Copy ${sameCount})`,
        userId: Number(version.userId),
        folderId: folderId,
        size: version.size,
        isCurrent: true,
        documentId: Number(version.documentId),
      },
    });
  }

  const latest = await prisma.documentVersion.findFirst({
    where: { id: newVersion.id },
    include: { document: true },
  });

  if (version.document.isFolder) {
    // get all files in this folder
    let documents = await prisma.documentVersion.findMany({
      where: { folderId: version.document.id },
      include: { document: true },
    });
    // loop through the docments
    for (const doc of documents) {
      // recursive call
      await createNewVersion(doc, Number(latest?.document.id), isDuplicate);
    }
  }
};

export const copyDocuments = async (
  docIds: string[],
  folderId: number,
  userId: number
): Promise<Feedback<boolean>> => {
  let feedback = new Feedback<boolean>();
  try {
    let folder = await prisma.documentVersion.findFirst({
      where: { documentId: folderId, isCurrent: true },
    });
    let activities: any[] = [];
    for (let id of docIds) {
      let version = await prisma.documentVersion.findFirst({
        where: { id },
        include: { document: true },
      });
      if (version) {
        await createNewVersion(version, folderId);
        activities.push({
          content: `copied ${version.name} to ${
            folder ? folder.name : "cloudify"
          } folder.`,
          userId,
          documentId: Number(version.documentId),
        });
      }
    }
    await prisma.activity.createMany({ data: activities });
  } catch (error) {
    console.log(error);
    feedback.success = false;
    feedback.message = "Failed to copy document(s)";
  }
  return feedback;
};

export const moveDocuments = async (
  docIds: string[],
  folderId: number,
  user: User
) => {
  let feedback = new Feedback<boolean>();
  let activites = [];
  try {
    for (let id of docIds) {
      let version = await prisma.documentVersion.findFirst({
        where: { id },
        include: { document: true },
      });
      if (version) {
        let folder = await prisma.documentVersion.findFirst({
          where: { documentId: folderId },
        });
        await createNewVersion(version, folderId, false);
        activites.push({
          content: `moved ${version.name} to ${
            folder ? folder.name : "cloudify"
          } folder.`,
          documentId: Number(version?.documentId),
          userId: user.id,
        });
      }
    }
    await prisma.activity.createMany({ data: activites });
  } catch (error) {
    console.log(error);
    feedback.success = false;
    feedback.message = "Failed to move document(s)";
  }
  return feedback;
};

export const renameDocument = async (
  name: string,
  id: string,
  userId: number
) => {
  let feedback = new Feedback<boolean>();

  try {
    let document = await prisma.documentVersion.findFirst({ where: { id } });
    await prisma.documentVersion.update({ data: { name }, where: { id } });
    await prisma.activity.create({
      data: {
        content: `Renamed this file from ${document?.name} to ${name}`,
        documentId: Number(document?.documentId),
        userId,
      },
    });
  } catch (error) {
    console.log(error);
    feedback.success = false;
    feedback.message = "Failed to rename document";
  }

  return feedback;
};

export const starDocument = async (
  star: boolean,
  id: string,
  userId: number
) => {
  let feedback = new Feedback<boolean>();

  try {
    let alreadyStarred = await prisma.documentVersion.findFirst({
      where: { id, isStarred: star },
    });
    if (!alreadyStarred) {
      let version = await prisma.documentVersion.update({
        data: { isStarred: star },
        where: { id },
      });
      await prisma.activity.create({
        data: {
          content: `${star ? "added star to" : "removed star from"} ${
            version.name
          }`,
          userId,
          documentId: version.documentId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    feedback.success = false;
    feedback.message = "Failed to add star to document";
  }

  return feedback;
};

export const getStarredDocuments = async (
  page: number,
  userId: number,
  search?: string | undefined
) => {
  let pageSize = 20;
  let filter: any = {
    userId,
    isCurrent: true,
    isStarred: true,
  };
  let feedback = new Feedback<any>();
  if (search) filter.name = { contains: search };
  try {
    let totalDocuments = await prisma.documentVersion.count({
      where: filter,
    });
    let pager = new Pagination(page, pageSize).getPager(totalDocuments);
    feedback.page = page;
    feedback.pages = pager.pages;

    feedback.results = await prisma.documentVersion.findMany({
      where: filter,
      take: pageSize,
      skip: pager.start,
      include: { document: true },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.log(error);
    feedback.success = false;
    feedback.message = "Failed to retrieve data";
  }

  return feedback;
};
