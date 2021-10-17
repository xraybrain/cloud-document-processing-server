import { DocumentVersion, User } from '.prisma/client';
import { Request, Response } from 'express';
import Feedback from '../models/Feedback';
import AppRequest from '../models/interfaces/AppRequest.interface';
import DocumentUpload from '../models/interfaces/DocumentUpload.interface.';
import {
  UpdateDocumentsSchema,
  CreateFolderSchema,
  RenameDocumentsSchema,
  StarDocumentsSchema,
} from '../models/schemas/validators/DocumentSchema.validator';
import {
  copyDocuments,
  createDocuments,
  createFolder,
  getDocuments,
  getStarredDocuments,
  moveDocuments,
  renameDocument,
  starDocument,
} from '../services/document.services';
import { validator } from '../utils/validator.utils';

export const createDocumentController = async (
  req: AppRequest,
  res: Response
) => {
  let uploadFeedback: Feedback<DocumentUpload> = req.body;
  let feedback: Feedback<boolean> = new Feedback();
  feedback.message = uploadFeedback.message;
  let { folder } = uploadFeedback.formData || {};
  let user = req.user;

  try {
    if (uploadFeedback.results) {
      // save
      feedback = await createDocuments(
        uploadFeedback.results,
        Number(user?.id),
        folder ? Number(folder) : null
      );
    }

    if (!uploadFeedback.success) {
      feedback.success = false;
      feedback.message = uploadFeedback.message;
    }
  } catch (error) {
    console.log(error);
    feedback.success = false;
    feedback.message = 'Failed to process request';
  }
  res.send(feedback);
};

export const createFolderController = async (
  req: AppRequest,
  res: Response
) => {
  let formData = req.body;
  let user = req.user;
  let feedback = new Feedback<DocumentVersion>();
  try {
    let validated = await validator(CreateFolderSchema, formData);
    if (validated.isValid) {
      // save
      feedback = await createFolder(formData, Number(user?.id));
    } else {
      feedback.success = false;
      feedback.message = validated.errors.join('<br>');
    }
  } catch (error) {
    console.log(error);
    feedback.success = false;
    feedback.message = 'Failed to process request';
  }
  res.send(feedback);
};

export const getDocumentsController = async (
  req: AppRequest,
  res: Response
) => {
  let { folder, page, search } = req.query;
  let user = req.user;
  let feedback = await getDocuments(
    page ? Number(page) : 1,
    Number(user?.id),
    folder ? Number(folder) : undefined,
    search ? `${search}` : ''
  );
  res.send(feedback);
};

export const copyDocumentsController = async (
  req: AppRequest,
  res: Response
) => {
  let formData = req.body;
  let feedback = new Feedback<boolean>();
  let validated = await validator(UpdateDocumentsSchema, formData);
  console.log(formData);

  if (validated.isValid) {
    feedback = await copyDocuments(formData.docsId, formData.folderId);
  } else {
    feedback.success = false;
    feedback.message = validated.errors.join('<br>');
  }
  res.send(feedback);
};

export const moveDocumentsController = async (
  req: AppRequest,
  res: Response
) => {
  let formData = req.body;
  let feedback = new Feedback<boolean>();
  let validated = await validator(UpdateDocumentsSchema, formData);
  let user = req.user;

  if (validated.isValid) {
    feedback = await moveDocuments(
      formData.docsId,
      formData.folderId,
      user as User
    );
  } else {
    feedback.success = false;
    feedback.message = validated.errors.join('<br>');
  }
  res.send(feedback);
};

export const renameDocumentController = async (
  req: AppRequest,
  res: Response
) => {
  let formData = req.body;
  let feedback = new Feedback<boolean>();
  let validated = await validator(RenameDocumentsSchema, formData);

  if (validated.isValid) {
    feedback = await renameDocument(formData.name, formData.id);
  } else {
    feedback.success = false;
    feedback.message = validated.errors.join('<br>');
  }
  res.send(feedback);
};

export const starDocumentController = async (
  req: AppRequest,
  res: Response
) => {
  let formData = req.body;
  let feedback = new Feedback<boolean>();
  let validated = await validator(StarDocumentsSchema, formData);
  let user = req.user;

  if (validated.isValid) {
    feedback = await starDocument(formData.star, formData.docId, Number(user?.id));
  } else {
    feedback.success = false;
    feedback.message = validated.errors.join('<br>');
  }
  res.send(feedback);
};


export const getStarredDocumentsController = async (
  req: AppRequest,
  res: Response
) => {
  let { page, search } = req.query;
  let user = req.user;
  let feedback = await getStarredDocuments(
    page ? Number(page) : 1,
    Number(user?.id),
    search ? `${search}` : ''
  );
  res.send(feedback);
};