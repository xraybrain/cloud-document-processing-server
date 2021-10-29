import { Application } from "express";
import ActivityRoute from "./Activity.routes";
import CommentRoute from "./Comment.routes";
import DocumentRoute from "./Document.routes";
import ShareDocumentRoute from "./Share.routes";
import UserRoute from "./User.routes";

export default class Route {
  constructor(protected app: Application) {
    this.routes();
  }

  routes() {
    new UserRoute(this.app).register();
    new DocumentRoute(this.app).register();
    new CommentRoute(this.app).register();
    new ShareDocumentRoute(this.app).register();
    new ActivityRoute(this.app).register();
  }
}
