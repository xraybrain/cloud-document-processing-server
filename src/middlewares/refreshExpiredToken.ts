import { NextFunction, Response } from "express";
import AppRequest from "../models/interfaces/AppRequest.interface";
import { decodeToken, verifyToken } from "../utils/jwt.utils";
import { getUser } from "../services/user.services";
import {
  getRefreshToken,
  refreshAccessToken,
  updateRefreshToken,
} from "../services/token.services";

export const refreshExpiredToken = async (
  req: AppRequest,
  res: Response,
  next: NextFunction
) => {
  let authorization =
    req.headers["authorization"] || `${req.query["authorization"]}`;

  if (authorization) {
    authorization = authorization.split(" ")[1];
    let verifiedAccessToken = verifyToken(authorization);

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
            console.log("refreshed");
            // refresh token
            let token = await refreshAccessToken(user, refreshToken.id);
            let tokenize = `Bearer ${token}`;
            req.headers["authorization"] = tokenize;
            res.setHeader("X-Refresh", tokenize);
          } else {
            // update valid to false
            updateRefreshToken(decoded.token, { valid: false });
            req.headers["authorization"] = "";
          }
        }
      }
    }
  }

  next();
};
