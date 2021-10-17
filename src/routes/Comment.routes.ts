import { formidableService } from '../middlewares/uploadDocument';
const uploader = formidableService();
import { Application } from 'express';
import { ensureAuthenticated } from '../middlewares/auth';
import IRoute from '../models/interfaces/Route.interface';
import { createComment } from '../services/comment.services';
import {
  createCommentController,
  deleteCommentController,
  editCommentController,
  getCommentsController,
} from '../controllers/comment.controller';

export default class CommentRoute implements IRoute {
  constructor(protected app: Application) {}
  register() {
    this.app.post(
      '/document/comment/',
      ensureAuthenticated,
      createCommentController
    );

    this.app.get(
      '/document/comments/',
      ensureAuthenticated,
      getCommentsController
    );

    this.app.put(
      '/document/comment/',
      ensureAuthenticated,
      editCommentController
    );

    this.app.delete(
      '/document/comment',
      ensureAuthenticated,
      deleteCommentController
    );
  }
}
