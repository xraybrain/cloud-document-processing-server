import { User } from ".prisma/client";
import { Request, Response } from "express";
import Feedback from "../models/Feedback";
import AppRequest from "../models/interfaces/AppRequest.interface";
import { ShareDocumentSchema } from "../models/schemas/validators/ShareDocumentShema.validator";
import {
  deleteShare,
  generateShareLink,
  getSharedDocuments,
  getSharedWithMembers,
  shareDocument,
} from "../services/share.services";
import { verifyToken } from "../utils/jwt.utils";
import { validator } from "../utils/validator.utils";

export const getSharedDocumentsController = async (
  req: AppRequest,
  res: Response
) => {
  let user = req.user;
  let feedback = new Feedback<any>();
  let { page } = req.query;
  feedback = await getSharedDocuments(Number(page || 1), user as User);
  res.json(feedback);
};

export const getSharedWithMembersController = async (
  req: AppRequest,
  res: Response
) => {
  let feedback = new Feedback<any>();
  let { doc } = req.query;
  feedback = await getSharedWithMembers(`${doc}`);
  res.json(feedback);
};

export const generateShareLinkController = async (
  req: AppRequest,
  res: Response
) => {
  let user = req.user;
  let { docId } = req.body;
  let feedback = new Feedback<string>();
  if (docId) {
    feedback = await generateShareLink(docId, user as User);
  } else {
    feedback.success = false;
    feedback.message =
      "Failed to generate link because the document id is missing";
  }
  res.send(feedback);
};

export const shareDocumentController = async (
  req: AppRequest,
  res: Response
) => {
  let formData = req.body;
  let validated = await validator(ShareDocumentSchema, formData);
  let feedback = new Feedback<boolean>();
  let user = req.user;

  if (validated.isValid) {
    feedback = await shareDocument(formData.docId, formData.user, user as User);
  } else {
    feedback.success = false;
    feedback.message = validated.errors.join(",");
  }
  res.send(feedback);
};

export const deleteShareController = async (req: AppRequest, res: Response) => {
  let { docId, user } = req.body;
  let feedback = await deleteShare(docId, user);
  res.send(feedback);
};

export const decryptSharerTokenController = async (
  req: AppRequest,
  res: Response
) => {
  let { token } = req.query;
  let redirectUrl = `${req.hostname}://${req.baseUrl}`;
  if (process.env.NODE_ENV === "production") {
    redirectUrl = "/preview/";
  } else {
    redirectUrl = `http://localhost:4200/preview/`;
  }
  if (token) {
    let verified = verifyToken(token as string);
    if (!verified.expired) {
      let { doc } = verified.decoded;
      res.redirect(`${redirectUrl}${doc}`);
    } else {
      res.render("sharer", { message: "Failed to verify token" });
    }
  } else {
    res.render("sharer", { message: "This link is broken" });
  }
};
