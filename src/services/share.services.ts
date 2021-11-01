import { PrismaClient, Share, User } from "@prisma/client";
import Feedback from "../models/Feedback";
import Pagination from "../models/Pagination";
import { signToken } from "../utils/jwt.utils";
import { sendMail } from "../utils/nodemailer.utils";

const prisma = new PrismaClient();

export const shareDocument = async (
  docId: string,
  userId: number,
  owner: User
) => {
  let feedback = new Feedback<boolean>();
  try {
    let user = await prisma.user.findFirst({ where: { id: userId } });
    if (user) {
      let version = await prisma.documentVersion.findFirst({
        where: { id: docId, isCurrent: true },
      });
      if (version) {
        let alreadyShared = await prisma.share.findFirst({
          where: { versionId: docId, userId },
        });
        if (!alreadyShared) {
          await prisma.share.create({
            data: {
              versionId: docId,
              userId,
            },
          });

          // Send notification mail
          await sendMail({
            to: `${user.email}`,
            from: `<myproject2019@aol.com>`,
            subject: `${owner.firstname} ${owner.lastname} (via Cloudify)`,
            html: `
              <p>
                Hi, ${user.firstname} ${user.lastname}!
              </p>
              <p>
                ${owner.firstname} ${owner.lastname} (<a href="mailto:${owner.email}">${owner.email}</a>) Shared "<b>${version?.name}</b>" with you on Cloudify.
              </p>
              <br>
              <br>
              <a href="${process.env.DOMAIN}" style="background-color: #dc3545; color: #fff; padding: 0.8rem;display: inline-block; text-decoration: none">
              Login
              </a>
              <br>
              <br>
              <p>
                Enjoy!
              </p>
              <p>
                The Cloudify Team
              </p>
          `,
          });

          feedback.message = `Shared!`;
        } else {
          feedback.success = false;
          feedback.message = "Already shared";
        }
      } else {
        feedback.message = "Document does not exists";
        feedback.success = false;
      }
    } else {
      feedback.message = "User does not exists";
      feedback.success = false;
    }
  } catch (error) {
    console.log(error);
    feedback.message = "Failed to share document";
    feedback.success = false;
  }
  return feedback;
};

export const getSharedDocuments = async (page: number, user: User) => {
  let pageSize = 20;
  let feedback = new Feedback<any>();
  try {
    let totalShared = await prisma.share.count({
      where: { userId: user.id },
    });
    let pager = new Pagination(page, pageSize).getPager(totalShared);
    feedback.page = page;
    feedback.pages = pager.pages;

    const temp = await prisma.share.findMany({
      where: { userId: user.id, deletedAt: { equals: undefined } },
      take: pageSize,
      skip: pager.start,
      include: { version: { include: { document: true } } },
      orderBy: [{ createdAt: "desc" }],
    });

    feedback.results = temp.map((d) => ({...d.version, isOwner: false}));
  } catch (error) {
    console.log(error);
    feedback.success = false;
    feedback.message = "Failed to retrieve shared documents";
  }
  return feedback;
};

export const generateShareLink = async (docId: string, user: User) => {
  let feedback = new Feedback<string>();
  // token expires in 30 days
  let token = signToken({ user: user.id, doc: docId }, "30d");
  feedback.result = `${process.env.DOMAIN}sharer?token=${token}`;
  feedback.message = "Link expires in 30 days";
  return feedback;
};

export const getSharedWithMembers = async (docId: string) => {
  let feedback = new Feedback<any>();
  try {
    const result = await prisma.documentVersion.findFirst({
      where: { id: docId },
      include: {
        shares: {
          include: {
            user: {
              select: {
                firstname: true,
                lastname: true,
                id: true,
                image: true,
              },
            },
          },
        },
        document: {
          include: {
            user: {
              select: {
                firstname: true,
                lastname: true,
                image: true,
                id: true,
              },
            },
          },
        },
      },
    });
    let owner = { ...result?.document.user, isOwner: true };
    let temp = [owner];
    temp.push();
    if (Array.isArray(result?.shares)) {
      let shares = result?.shares as Array<any>;
      temp = temp.concat(shares.map((d) => d.user));
    }
    feedback.results = temp;
  } catch (error) {
    console.log(error);
    feedback.success = false;
    feedback.message = "Failed to retrieve members";
  }
  return feedback;
};

export const deleteShare = async (docId: string, user: number) => {
  const feedback = new Feedback<boolean>();
  try {
    const share = await prisma.share.findFirst({
      where: { versionId: docId, userId: user },
    });
    if (share) {
      await prisma.share.delete({
        where: { id: share.id },
      });
      feedback.message = "Deleted!";
    } else {
      throw new Error("Failed to delete");
    }
  } catch (error) {
    feedback.message = "Failed to perform request";
    feedback.success = false;
  }
  return feedback;
};
