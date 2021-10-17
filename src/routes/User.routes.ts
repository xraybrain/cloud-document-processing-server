import { Application, Request, Response } from 'express';
import {
  changePasswordController,
  createUserController,
  deleteUserController,
  editUserController,
  getCurrentUser,
  getUserController,
  loginController,
  logoutController,
} from '../controllers/user.controllers';
import { ensureAuthenticated } from '../middlewares/auth';
import IRoute from '../models/interfaces/Route.interface';

export default class UserRoute implements IRoute {
  constructor(protected app: Application) {}
  register() {
    this.app.post('/user/', createUserController);
    this.app.get('/user/profile', ensureAuthenticated, getCurrentUser);
    this.app.get('/user/:id/profile', getUserController);
    this.app.put('/user/', editUserController);
    this.app.delete('/user/', deleteUserController);
    this.app.post('/user/login', loginController);
    this.app.post('/user/logout', logoutController);
    this.app.put('/user/change/password', changePasswordController);
  }
}
