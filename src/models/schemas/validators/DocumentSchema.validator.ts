import { object, string, number, array, boolean } from 'yup';

export const CreateFolderSchema = object().shape({
  name: string().required().max(150),
  folderId: number().optional(),
});

export const UpdateDocumentsSchema = object().shape({
  docsId: array().required().of(string().required()),
  folderId: number().required(),
});

export const RenameDocumentsSchema = object().shape({
  id: string().required(),
  name: string().required(),
});

export const StarDocumentsSchema = object().shape({
  docId: string().required(),
  star: boolean().required(),
});
