import { Application } from "express";
import { ensureAuthenticated } from "../middlewares/auth";
import IRoute from "../models/interfaces/Route.interface";
import {
  decryptSharerTokenController,
  deleteShareController,
  generateShareLinkController,
  getSharedDocumentsController,
  getSharedWithMembersController,
  shareDocumentController,
} from "../controllers/share.controller";

export default class ShareDocumentRoute implements IRoute {
  constructor(protected app: Application) {}
  register() {
    this.app.post(
      "/share/generate/link/",
      ensureAuthenticated,
      generateShareLinkController
    );

    this.app.get(
      "/shared/documents/",
      ensureAuthenticated,
      getSharedDocumentsController
    );
    this.app.get(
      "/shared/members/",
      ensureAuthenticated,
      getSharedWithMembersController
    );

    this.app.post("/share/document/", shareDocumentController);

    this.app.get("/sharer/", decryptSharerTokenController);

    this.app.delete("/shared/document", deleteShareController);
  }
}
