import { NextFunction, Response } from 'express';
import AppRequest from '../models/interfaces/AppRequest.interface';
import { decodeToken, verifyToken } from '../utils/jwt.utils';
import { getUser } from '../services/user.services';
import {
  getRefreshToken,
  refreshAccessToken,
  updateRefreshToken,
} from '../services/token.services';

export const refreshExpiredToken = async (
  req: AppRequest,
  res: Response,
  next: NextFunction
) => {
  let authorization =
    req.headers['authorization'] || `${req.query['authorization']}`;

  if (authorization) {
    authorization = authorization.split(' ')[1];
    let verifiedAccessToken = await verifyToken(authorization);
    if (verifiedAccessToken.expired) {
      let decoded = await decodeToken(authorization);
      if (decoded) {
        let user = await getUser({ id: decoded.user });
        let refreshToken = await getRefreshToken({
          id: decoded.token,
          userId: user?.id,
          valid: true,
        });

        if (refreshToken && user) {
          let verified = verifyToken(refreshToken.token);
          if (!verified.expired) {
            // refresh token
            let token = await refreshAccessToken(user, refreshToken.id);
            req.headers['authorization'] = `Bearer ${token}`;
            res.setHeader('X-Access-Refresh', `Bearer ${token}`);
          } else {
            // update valid to false
            updateRefreshToken(decoded.token, { valid: false });
          }
        }
      }
    }
  }

  next();
};
