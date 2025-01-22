import { genralFieldValidation } from "../../meddlewares/validation.middleware.js";
import joi from "joi";

export const updateProfileSchema = joi
  .object({
    userName: genralFieldValidation.userName,
    email: genralFieldValidation.email,
    phone: genralFieldValidation.phone,
  })
  .required();

export const changePasswordSchema = joi
  .object({
    oldPassword: genralFieldValidation.password.required(),
    password: genralFieldValidation.password
      .not(joi.ref("oldPassword"))
      .required(),
    confirmPassword: genralFieldValidation.confirmPassword.required(),
  })
  .required();

export const reactivateAccountSchema = joi
  .object({
    email: genralFieldValidation.email.required(),
    password: genralFieldValidation.password.required(),
  })
  .required();
