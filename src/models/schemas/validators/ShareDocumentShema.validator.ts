import { object, string, number, array, boolean } from "yup";

export const ShareDocumentSchema = object().shape({
  docId: string().required(),
  user: number().required(),
});
