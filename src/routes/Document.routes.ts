import { formidableService } from '../middlewares/uploadDocument';
const uploader = formidableService();
import { Application, Request, Response } from 'express';
import { ensureAuthenticated } from '../middlewares/auth';
import IRoute from '../models/interfaces/Route.interface';
import {
  copyDocumentsController,
  createDocumentController,
  createFolderController,
  getDocumentsController,
  getStarredDocumentsController,
  moveDocumentsController,
  renameDocumentController,
  starDocumentController
} from '../controllers/document.controllers';
import { getDocuments } from '../services/document.services';

export default class DocumentRoute implements IRoute {
  constructor(protected app: Application) {}
  register() {
    this.app.post(
      '/document/upload/',
      ensureAuthenticated,
      uploader,
      createDocumentController
    );

    this.app.post(
      '/document/folder/',
      ensureAuthenticated,
      createFolderController
    );

    this.app.get('/documents/', ensureAuthenticated, getDocumentsController);

    this.app.post(
      '/documents/copy/',
      ensureAuthenticated,
      copyDocumentsController
    );

    this.app.post(
      '/documents/move/',
      ensureAuthenticated,
      moveDocumentsController,
    );

    this.app.post(
      '/document/rename',
      ensureAuthenticated,
      renameDocumentController
    );

    this.app.post(
      '/document/star',
      ensureAuthenticated,
      starDocumentController
    );

    this.app.get(
      '/documents/star',
      ensureAuthenticated,
      getStarredDocumentsController
    );
  }
}
