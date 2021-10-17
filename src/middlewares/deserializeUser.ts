import { NextFunction, Response } from 'express';
import AppRequest from '../models/interfaces/AppRequest.interface';
import { verifyToken } from '../utils/jwt.utils';
import { getUser } from '../services/user.services';

export const deserializeUser = async (
  req: AppRequest,
  res: Response,
  next: NextFunction
) => {
  let authorization =
    req.headers['authorization'] || `${req.query['authorization']}`;
  req.user = null;
  if (authorization) {
    authorization = authorization.split(' ')[1];
    let verified = verifyToken(authorization);
    if (!verified.expired) {
      let decoded = verified.decoded;
      req.user = await getUser({ id: decoded.user });
    }
  }

  next();
};
