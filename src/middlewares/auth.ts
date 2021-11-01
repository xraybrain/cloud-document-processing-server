import { NextFunction, Request, Response } from "express";
import Feedback from "../models/Feedback";
import { verifyToken } from "../utils/jwt.utils";

export const ensureAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let authorization =
    req.headers["authorization"] || `${req.query["authorization"]}`;
  let feedback = new Feedback<string>();

  if (!authorization) {
    feedback.success = false;
    feedback.message = "unauthorized";
    return res.status(401).send(feedback);
  }

  authorization = authorization.split(" ")[1];
  let verified = verifyToken(authorization);

  if (verified.expired) {
    feedback.success = false;
    feedback.message = "session expired, login again";
    return res.status(401).send(feedback);
  }

  next();
};
