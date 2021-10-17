import { PrismaClient, User } from '@prisma/client';
import Feedback from '../models/Feedback';
import Pagination from '../models/Pagination';

const prisma = new PrismaClient();

export const createComment = async (data: any, userId: number) => {
  let feedback = new Feedback<any>();
  try {
    let user = await prisma.user.findFirst({ where: { id: userId } });
    let { id } = await prisma.comment.create({
      data: {
        content: data.content,
        documentId: data.docId,
        userId,
      },
    });

    // register activity
    await prisma.activity.create({
      data: {
        content: `commented`,
        documentId: id,
        userId,
      },
    });
    // comment with user returned
    let comment = await prisma.comment.findFirst({
      where: { id },
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
    });

    feedback.result = comment;
  } catch (error) {
    console.log(error);
    feedback.success = false;
    feedback.message = 'Failed to post comment';
  }

  return feedback;
};

export const getComments = async (page: number, docId: number) => {
  let feedback = new Feedback();
  let pageSize = 15;
  try {
    let totalComments = await prisma.comment.count({
      where: { documentId: docId },
    });
    let pager = new Pagination(page, pageSize).getPager(totalComments);
    feedback.page = page;
    feedback.pages = pager.pages;
    feedback.results = await prisma.comment.findMany({
      skip: pager.start,
      take: pageSize,
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
    });
  } catch (error) {
    console.log(error);
    feedback.success = false;
    feedback.message = 'Failed to retrieve comments';
  }

  return feedback;
};

export const editComment = async (content: string, id: number) => {
  let feedback = new Feedback<boolean>();
  try {
    await prisma.comment.update({ data: { content }, where: { id } });
  } catch (error) {
    feedback.success = false;
    feedback.message = 'Failed to edit comment';
  }
  return feedback;
};

export const deleteComment = async (id: number) => {
  let feedback = new Feedback<boolean>();
  try {
    await prisma.comment.delete({ where: { id } });
  } catch (error) {
    console.log(error);
    feedback.success = false;
    feedback.message = 'Failed to delete comment';
  }
  return feedback;
};
