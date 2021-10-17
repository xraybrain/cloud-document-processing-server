import { PrismaClient, Document, DocumentVersion, User } from '@prisma/client';
import Feedback from '../models/Feedback';
import DocumentUpload from '../models/interfaces/DocumentUpload.interface.';
import Pagination from '../models/Pagination';

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

      feedback.result = await prisma.documentVersion.findFirst({
        where: { id: version.id },
        include: { document: true },
      });

      // TODO:
      // Register create activity
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
  filterBy?: string,
) => {
  let pageSize = 20;
  let filter: any = {
    folderId: folderId || null,
    userId,
    isCurrent: true,
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
        createdAt: 'desc',
      },
    });
  } catch (error) {
    console.log(error);
    feedback.success = false;
    feedback.message = 'Failed to retrieve data';
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
    feedback.message = 'Failed to retrieve document';
  }
  return feedback;
};

export const deleteDocument = async (id: string) => {
  let feedback = new Feedback<boolean>();
  try {
    await prisma.documentVersion.update({
      data: {
        deletedAt: new Date(),
        document: { update: { deletedAt: new Date() } },
      },
      where: { id },
    });
    // TODO:
    // Register delete activity
  } catch (error) {
    feedback.success = false;
    feedback.message = 'Failed to delete document';
  }
  return feedback;
};

export const deleteFolder = async (folderId: number) => {
  let feedback = new Feedback<boolean>();
  try {
    await prisma.documentVersion.updateMany({
      data: {
        deletedAt: new Date(),
      },
      where: { folderId },
    });
    // TODO
    // Register delete activity
  } catch (error) {
    feedback.success = false;
    feedback.message = 'Failed to delete document';
  }
  return feedback;
};

export const copyDocuments = async (
  docIds: string[],
  folderId: number
): Promise<Feedback<boolean>> => {
  let feedback = new Feedback<boolean>();
  try {
    for (let id of docIds) {
      let version = await prisma.documentVersion.findFirst({
        where: { id },
        include: { document: true },
      });
      if (version) {
        // check if another copy already exists in folder
        let sameCount = await prisma.documentVersion.count({
          where: { name: { startsWith: version.name }, folderId },
        });

        let newVersion = prisma.documentVersion.create({
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

        await prisma.$transaction([newVersion]);
        // TODO:
        // Register Copy activity
      }
    }
  } catch (error) {
    console.log(error);
    feedback.success = false;
    feedback.message = 'Failed to copy document(s)';
  }

  return feedback;
};

export const moveDocuments = async (
  docIds: string[],
  folderId: number,
  user: User
) => {
  let feedback = new Feedback<boolean>();
  try {
    for (let id of docIds) {
      let document = await prisma.documentVersion.findFirst({ where: { id } });
      if (document) {
        let updateVersion = prisma.documentVersion.update({
          data: { isCurrent: false },
          where: { id },
        });

        // check if another copy already exists in folder
        let sameCount = await prisma.documentVersion.count({
          where: { name: { startsWith: document.name }, folderId },
        });

        let newVersion = prisma.documentVersion.create({
          data: {
            name:
              sameCount == 0
                ? `${document?.name}`
                : `${document?.name} (Copy ${sameCount})`,
            userId: Number(document?.userId),
            folderId: folderId,
            size: document?.size,
            isCurrent: true,
            documentId: Number(document?.documentId),
          },
        });

        await prisma.$transaction([updateVersion, newVersion]);
        await prisma.activity.create({
          data: {
            content: `Moved this file`,
            documentId: Number(document?.documentId),
            userId: user.id,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    feedback.success = false;
    feedback.message = 'Failed to move document(s)';
  }
  return feedback;
};

// export const moveFolders = async () => {};

// export const copyFolders = async () => {};

export const renameDocument = async (name: string, id: string) => {
  let feedback = new Feedback<boolean>();

  try {
    await prisma.documentVersion.update({ data: { name }, where: { id } });
    // TODO:
    // register rename activity
    // await prisma.$transaction([updateVersion, newVersion]);
  } catch (error) {
    console.log(error);
    feedback.success = false;
    feedback.message = 'Failed to rename document';
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
          content: `${star ? 'Starred' : 'Unstarred'} ${version.name}`,
          userId,
          documentId: version.documentId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    feedback.success = false;
    feedback.message = 'Failed to add star to document';
  }

  return feedback;
};

export const getStarredDocuments = async (
  page: number,
  userId: number,
  search?: string | undefined,
) => {
  let pageSize = 20;
  let filter: any = {
    userId,
    isCurrent: true,
    isStarred: true
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
        createdAt: 'desc',
      },
    });
  } catch (error) {
    console.log(error);
    feedback.success = false;
    feedback.message = 'Failed to retrieve data';
  }

  return feedback;
};
