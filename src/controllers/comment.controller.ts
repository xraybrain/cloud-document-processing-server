import { Request, Response } from 'express';
import Feedback from '../models/Feedback';
import AppRequest from '../models/interfaces/AppRequest.interface';
import {
  CreateCommentSchema,
  UpdateCommentSchema,
} from '../models/schemas/validators/CommentSchema.validator';
import {
  createComment,
  deleteComment,
  editComment,
  getComments,
} from '../services/comment.services';
import { validator } from '../utils/validator.utils';

export const createCommentController = async (
  req: AppRequest,
  res: Response
) => {
  let feedback = new Feedback<any>();
  let user = req.user;
  let formData = req.body;
  let validated = await validator(CreateCommentSchema, formData);

  if (validated.isValid) {
    feedback = await createComment(formData, Number(user?.id));
  } else {
    feedback.success = false;
    feedback.message = validated.errors.join('<br>');
  }
  res.send(feedback);
};

export const getCommentsController = async (req: Request, res: Response) => {
  let page = req.query.page || 1;
  let docId = Number(req.query.docid);
  let feedback = new Feedback<any>();

  if (docId) {
    feedback = await getComments(Number(page), docId);
  } else {
    feedback.success = false;
    feedback.message = 'This link might be invalid or broken';
    feedback.results = [];
  }
  res.send(feedback);
};

export const editCommentController = async (req: AppRequest, res: Response) => {
  let formData = req.body;
  let feedback = new Feedback<boolean>();
  let validated = await validator(UpdateCommentSchema, formData);

  if (validated.isValid) {
    feedback = await editComment(formData.content, formData.id);
  } else {
    feedback.message = validated.errors.join('<br>');
    feedback.success = false;
  }
  res.send(feedback);
};

export const deleteCommentController = async (req: Request, res: Response) => {
  let { id } = req.body;
  let feedback = await deleteComment(id);
  res.send(feedback);
};
