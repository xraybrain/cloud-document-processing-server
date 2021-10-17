import { Application} from 'express';
import { ensureAuthenticated } from '../middlewares/auth';
import IRoute from '../models/interfaces/Route.interface';
import { shareDocumentController } from '../controllers/share.controller';

export default class ShareDocumentRoute implements IRoute {
  constructor(protected app: Application) {}
  register() {
    this.app.post(
      '/share/document/',
      ensureAuthenticated,
      shareDocumentController
    );
  }
}
