import dotenv from 'dotenv';
import { RefreshToken, PrismaClient, User } from '@prisma/client';
import Feedback from '../models/Feedback';
import { signToken } from '../utils/jwt.utils';
dotenv.config();

const prisma = new PrismaClient();

export const createAccessToken = async (
  user: User,
  userAgent: string
): Promise<string> => {
  let refreshToken = await createRefreshToken(
    signToken(
      { user: user.id, role: user.role },
      process.env.REFRESH_TOKEN_TIMEOUT
    ),
    user.id,
    userAgent
  );

  let token = signToken(
    { user: user.id, role: user.role, token: refreshToken?.id },
    process.env.ACCESS_TOKEN_TIMEOUT
  );
  return token;
};

export const refreshAccessToken = async (
  user: User,
  refreshTokenId: number
): Promise<string | null> => {
  let refreshed = await updateRefreshToken(refreshTokenId, {
    token: signToken(
      { user: user.id, role: user.role },
      process.env.REFRESH_TOKEN_TIMEOUT
    ),
  });

  let accessToken = null;
  if (refreshed) {
    accessToken = signToken(
      { user: user.id, role: user.role, token: refreshTokenId },
      process.env.ACCESS_TOKEN_TIMEOUT
    );
  }
  return accessToken;
};

const createRefreshToken = async (
  token: string,
  userId: number,
  userAgent: string
) => {
  let refreshToken: RefreshToken | null = null;
  try {
    refreshToken = await prisma.refreshToken.create({
      data: { token, userId, userAgent },
    });
  } catch (error: any) {
    console.log(error);
  }
  return refreshToken;
};

export const updateRefreshToken = async (id: number, data?: any) => {
  let updated = false;
  try {
    await prisma.refreshToken.update({
      data,
      where: { id },
    });
    updated = true;
  } catch (error: any) {
    console.log(error);
  }
  return updated;
};

export const getRefreshTokens = async (userId: number) => {
  let feedback = new Feedback<RefreshToken>();
  try {
    feedback.results = await prisma.refreshToken.findMany({
      where: { userId },
    });
  } catch (error) {
    console.log(error);
    feedback.success = false;
    feedback.message = 'Failed to retrieve data';
  }
  return feedback;
};

export const getRefreshToken = async (filter: any) => {
  let refreshToken: RefreshToken | null = null;
  try {
    refreshToken = await prisma.refreshToken.findFirst({ where: filter });
  } catch (error) {
    console.log(error);
  }
  return refreshToken;
};
