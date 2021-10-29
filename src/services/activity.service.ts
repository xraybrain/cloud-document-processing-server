import { PrismaClient } from "@prisma/client";
import Feedback from "../models/Feedback";
import Pagination from "../models/Pagination";

const prisma = new PrismaClient();

export const getActivities = async (page: number, docId: number) => {
  let feedback = new Feedback();
  let pageSize = 20;
  try {
    let totalActivities = await prisma.activity.count({
      where: { documentId: docId },
    });
    let pager = new Pagination(page, pageSize).getPager(totalActivities);
    feedback.page = page;
    feedback.pages = pager.pages;
    feedback.results = await prisma.activity.findMany({
      where: { documentId: docId },
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
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.log(error);
    feedback.success = false;
    feedback.message = "Failed to retrieve activities";
  }

  return feedback;
};
