import { number, object, string } from 'yup';

export const CreateCommentSchema = object().shape({
  content: string().required(),
  docId: number().required(),
});

export const UpdateCommentSchema = object().shape({
  content: string().required(),
  id: number().required(),
});
