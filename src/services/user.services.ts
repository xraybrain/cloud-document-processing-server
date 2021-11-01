import { genSaltSync, hashSync } from "bcryptjs";
import dotenv from "dotenv";
import { PrismaClient, User } from "@prisma/client";
import Feedback from "../models/Feedback";
import Pagination from "../models/Pagination";
dotenv.config();

const prisma = new PrismaClient();
const SALT_ROUND = Number(process.env.SALT_ROUND);

export const createUser = async (user: any): Promise<Feedback<Boolean>> => {
  let feedback = new Feedback<Boolean>();
  try {
    let salt = genSaltSync(SALT_ROUND);
    user.password = hashSync(user.password, salt);
    await prisma.user.create({ data: user });
  } catch (error: any) {
    console.log(error);
    feedback.success = false;
    feedback.message = "Failed to create account";
  }
  return feedback;
};

export const getUsers = async (
  page: number,
  search?: string,
  userId?: number
) => {
  let pageSize = 50;
  let filter: any = {};
  let feedback = new Feedback<any>();

  if (search) {
    filter.OR = [
      { firstname: { contains: search } },
      { lastname: { contains: search } },
      { email: search },
    ];
  }

  console.log(userId);

  if (userId) {
    filter.id = { not: userId };
  }

  try {
    let totalUsers = await prisma.user.count({
      where: filter,
    });
    let pager = new Pagination(page, pageSize).getPager(totalUsers);
    feedback.page = page;
    feedback.pages = pager.pages;

    feedback.results = await prisma.user.findMany({
      where: filter,
      take: pageSize,
      skip: pager.start,
      orderBy: [{ firstname: "asc" }, { lastname: "asc" }],
    });
  } catch (error) {
    console.log(error);
    feedback.success = false;
    feedback.message = "Failed to retrieve data";
  }

  return feedback;
};

export const getUser = async (query: any): Promise<User | null> => {
  let user: User | null = null;
  try {
    user = await prisma.user.findFirst({
      where: query,
    });
  } catch (error) {
    console.log(error);
  }
  return user;
};

export const editUser = async (updateData: any): Promise<Feedback<Boolean>> => {
  let feedback = new Feedback<boolean>();
  try {
    // Check if email has been altered
    if (updateData.email) {
      let userExists = await prisma.user.findFirst({
        where: { id: updateData.id, email: updateData.email },
      });
      if (userExists) {
        // User has to verify to email
        updateData.hasVerifiedEmail = false;
      }
    }
    await prisma.user.update({
      data: updateData,
      where: { id: updateData.id },
    });
    feedback.result = true;
  } catch (error: any) {
    console.log(error);
    feedback.success = false;
    feedback.message = "Failed to update account";
  }
  return feedback;
};

export const deleteUser = async (id: number): Promise<Feedback<Boolean>> => {
  let feedback = new Feedback<Boolean>();
  try {
    await prisma.user.delete({ where: { id: Number(id) } });
  } catch (error) {
    console.log(error);
    feedback.success = false;
    feedback.message = "Failed to delete account";
  }

  return feedback;
};

export const editPassword = async (
  updateData: any
): Promise<Feedback<Boolean>> => {
  let feedback = new Feedback<Boolean>();
  try {
    let salt = genSaltSync(SALT_ROUND);
    let password = hashSync(updateData.password, salt);
    await prisma.user.update({
      data: { password },
      where: { id: updateData.id },
    });
    feedback.result = true;
  } catch (error: any) {
    console.log(error);
    feedback.success = false;
    feedback.message = "Failed to update account password";
  }
  return feedback;
};
