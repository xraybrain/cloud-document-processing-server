import { compareSync } from 'bcryptjs';
import { Request, Response } from 'express';
import {
  CreateUserSchema,
  UpdateUserPasswordSchema,
  UpdateUserSchema,
} from '../models/schemas/validators/UserSchema.validator';
import { validator } from '../utils/validator.utils';
import Feedback from '../models/Feedback';
import {
  createUser,
  deleteUser,
  editPassword,
  editUser,
  getUser,
} from '../services/user.services';
import {
  createAccessToken,
  updateRefreshToken,
} from '../services/token.services';
import AppRequest from '../models/interfaces/AppRequest.interface';
import { decodeToken } from '../utils/jwt.utils';

export const createUserController = async (req: Request, res: Response) => {
  let feedback = new Feedback<Boolean>();
  let formData = req.body;
  let validated = await validator(CreateUserSchema, formData);

  if (validated.isValid) {
    feedback = await createUser(formData);
    // TODO: send verification email
  } else {
    feedback.message = validated.errors.join('<br/>');
    feedback.success = false;
  }

  res.send(feedback);
};

export const getUserController = async (req: Request, res: Response) => {
  let { id } = req.params;
  let user = await getUser({ id: Number(id) });
  res.send(user);
};

export const getCurrentUser = async (req: AppRequest, res: Response) => {
  res.send(req.user);
};

export const editUserController = async (req: Request, res: Response) => {
  let feedback = new Feedback<Boolean>();
  let formData = req.body;
  let validated = await validator(UpdateUserSchema, formData);

  if (validated.isValid) {
    feedback = await editUser(formData);
  } else {
    feedback.message = validated.errors.join('<br/>');
    feedback.success = false;
  }

  res.send(feedback);
};

export const changePasswordController = async (req: Request, res: Response) => {
  let feedback = new Feedback<Boolean>();
  let formData = req.body;
  let validated = await validator(UpdateUserPasswordSchema, formData);

  if (validated.isValid) {
    feedback = await editPassword(formData);
  } else {
    feedback.message = validated.errors.join('<br/>');
    feedback.success = false;
  }

  res.send(feedback);
};

export const deleteUserController = async (req: Request, res: Response) => {
  let feedback = new Feedback<Boolean>();
  try {
    let { id } = req.body;
    feedback = await deleteUser(id);
  } catch (error) {
    feedback.message = 'Failed to process request';
    feedback.success = false;
  }
  res.json(feedback);
};

export const loginController = async (req: Request, res: Response) => {
  let { email, password } = req.body;
  let feedback = new Feedback<string>();

  console.log(req.body);

  if (!email || !password) {
    feedback.message = 'Both email and password are required';
    feedback.success = false;
    return res.send(feedback);
  }

  let user = await getUser({ email: `${email}` });

  if (!user) {
    feedback.message = 'Wrong email or password combination';
    feedback.success = false;
    return res.send(feedback);
  }

  if (!compareSync(password, user.password)) {
    feedback.message = 'Wrong email or password combination';
    feedback.success = false;
    return res.send(feedback);
  }

  // create access and refresh tokens
  let token = await createAccessToken(user, `${req.headers['user-agent']}`);

  feedback.message = 'success';
  res.setHeader('X-Access', `Bearer ${token}`);
  res.setHeader('access-control-expose-headers', 'x-access');
  res.send(feedback);
};

export const logoutController = async (req: Request, res: Response) => {
  let feedback = new Feedback<boolean>();
  try {
    let { authorization } = req.headers;
    if (authorization) {
      authorization = authorization.split(' ')[1];
      let decoded = await decodeToken(authorization);
      if (decoded) {
        await updateRefreshToken(decoded.token, { valid: false });
      } else {
        feedback.success = false;
        feedback.message = 'Invalid token';
      }
    } else {
      feedback.success = false;
      feedback.message = 'Token is required';
    }
  } catch (error) {
    console.log(error);
    feedback.success = false;
    feedback.message = 'Failed to logout';
  }
  res.send(feedback);
};
