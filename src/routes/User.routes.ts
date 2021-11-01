import { Application, Request, Response } from "express";
import {
  changePasswordController,
  createUserController,
  deleteUserController,
  editUserController,
  getCurrentUser,
  getUserController,
  getUsersController,
  loginController,
  logoutController,
  uploadAvatarController,
} from "../controllers/user.controllers";
import { ensureAuthenticated } from "../middlewares/auth";
import { formidableService } from "../middlewares/uploadDocument";
import IRoute from "../models/interfaces/Route.interface";
const uploader = formidableService();

export default class UserRoute implements IRoute {
  constructor(protected app: Application) {}
  register() {
    this.app.get("/users/", ensureAuthenticated, getUsersController);
    this.app.post("/user/", createUserController);
    this.app.post(
      "/user/avatar",
      ensureAuthenticated,
      uploader,
      uploadAvatarController
    );
    this.app.get("/user/profile", ensureAuthenticated, getCurrentUser);
    this.app.get("/user/:id/profile", ensureAuthenticated, getUserController);
    this.app.put("/user/", ensureAuthenticated, editUserController);
    this.app.delete("/user/", ensureAuthenticated, deleteUserController);
    this.app.post("/user/login", loginController);
    this.app.post("/user/logout", logoutController);
    this.app.put(
      "/user/change/password",
      ensureAuthenticated,
      changePasswordController
    );
  }
}
