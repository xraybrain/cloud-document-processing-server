import { genSaltSync, hashSync } from 'bcryptjs';
import dotenv from 'dotenv';
import { PrismaClient, User } from '@prisma/client';
import Feedback from '../models/Feedback';
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
    feedback.message = 'Failed to create account';
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
  let feedback = new Feedback<Boolean>();
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
    feedback.message = 'Failed to update account';
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
    feedback.message = 'Failed to delete account';
  }

  return feedback;
};

export const editPassword = async (
  updateData: any
): Promise<Feedback<Boolean>> => {
  let feedback = new Feedback<Boolean>();
  try {
    let salt = genSaltSync(SALT_ROUND);
    updateData.password = hashSync(updateData.password, salt);
    await prisma.user.update({
      data: updateData,
      where: { id: updateData.id },
    });
    feedback.result = true;
  } catch (error: any) {
    console.log(error);
    feedback.success = false;
    feedback.message = 'Failed to update account password';
  }
  return feedback;
};
