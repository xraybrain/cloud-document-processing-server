import { Application } from "express";
import { ensureAuthenticated } from "../middlewares/auth";
import IRoute from "../models/interfaces/Route.interface";
import { getActivitiesController } from "../controllers/activity.controller";

export default class ActivityRoute implements IRoute {
  constructor(protected app: Application) {}
  register() {
    this.app.get(
      "/document/activities/",
      ensureAuthenticated,
      getActivitiesController
    );
  }
}
