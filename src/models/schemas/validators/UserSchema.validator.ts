import { ref } from "yup";
import { object, string, number } from "yup";

export const CreateUserSchema = object().shape({
  firstname: string().required().max(40),
  lastname: string().required().max(40),
  email: string().email().required().max(60),
  password: string().required().min(4).max(16),
});

export const UpdateUserSchema = object().shape({
  firstname: string().optional().max(40).min(2),
  lastname: string().optional().max(40).min(2),
  email: string().email().optional().max(60),
  id: number().required(),
});

export const UpdateUserPasswordSchema = object().shape({
  password: string().required().min(4).max(16),
  confirmPassword: string().test(
    "password-match",
    "Password must match",
    function (value) {
      return this.parent.password === value;
    }
  ),
  id: number().required(),
});
