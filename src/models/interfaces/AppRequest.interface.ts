import { User } from '.prisma/client';
import { Request } from 'express';

export default interface AppRequest extends Request {
  user?: User | null;
  authorization?: string;
}
