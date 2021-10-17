import { User } from '.prisma/client';
import { Request, Response } from 'express';
import Feedback from '../models/Feedback';
import AppRequest from '../models/interfaces/AppRequest.interface';
import { ShareDocumentSchema } from '../models/schemas/validators/ShareDocumentShema.validator';
import { shareDocument } from '../services/share.services';
import { validator } from '../utils/validator.utils';

export const getSharedDocumentsController = async (
  req: Request,
  res: Response
) => {};

export const shareDocumentController = async (
  req: AppRequest,
  res: Response
) => {
  let user = req.user;
  let formData = req.body;
  let validated = await validator(ShareDocumentSchema, formData);
  let feedback = new Feedback<boolean>();
  if (validated.isValid) {
    feedback = await shareDocument(formData.docId, formData.email, user as User, `${req.protocol}://${req.hostname}`);
  } else {
    feedback.success = false;
    feedback.message = validated.errors.join(',');
  }
  res.send(feedback);
};
