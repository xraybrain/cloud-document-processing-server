import { decode, sign, verify } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = `${process.env.JWT_SECRET}`;
const ISSUER = 'Cloud-Document';

export const signToken = (
  payload: { user: number; role: number; token?: number },
  expires = '1m'
): string => {
  let token: string = '';
  try {
    token = sign(payload, JWT_SECRET, { expiresIn: expires, issuer: ISSUER });
  } catch (error) {
    console.log(error);
  }
  return token;
};

export const verifyToken = (token: string) => {
  let result: {
    decoded?: any;
    expired?: boolean;
  } = {
    decoded: null,
    expired: false,
  };
  try {
    result.decoded = verify(token, JWT_SECRET, { issuer: ISSUER });
  } catch (error: any) {
    result.expired = true;
  }
  return result;
};

export const decodeToken = async (token: string) => {
  let result: any = null;
  try {
    result = await decode(token);
  } catch (error: any) {
    console.log(error);
  }
  return result;
};
