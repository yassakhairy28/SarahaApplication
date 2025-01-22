import joi from "joi";
import { rolesType } from "../../meddlewares/auth.meddlewares.js";
import { genralFieldValidation } from "../../meddlewares/validation.middleware.js";

export const registerSchema = joi.object({
  userName: genralFieldValidation.userName.required(),
  email: genralFieldValidation.email.required(),
  password: genralFieldValidation.password.required(),
  confirmPassword: genralFieldValidation.confirmPassword.required(),
  phone: genralFieldValidation.phone.required(),
  gender: genralFieldValidation.gender,
  role: genralFieldValidation.role.default(rolesType.User),
});

export const loginSchema = joi.object({
  email: genralFieldValidation.email.required(),
  password: genralFieldValidation.password.required(),
});

export const forgetPasswordSchema = joi.object({
  email: genralFieldValidation.email.required(),
});

export const resetPasswordSchema = joi.object({
  email: genralFieldValidation.email.required(),
  code: genralFieldValidation.code.required(),
  password: genralFieldValidation.password.required(),
  confirmPassword: genralFieldValidation.confirmPassword.required(),
});
