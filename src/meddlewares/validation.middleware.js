import { Types } from "mongoose";
import joi from "joi";
import { rolesType } from "./auth.meddlewares.js";
export const validate = (schema) => {
  return (req, res, next) => {
    const data = { ...req.body, ...req.params, ...req.query };

    const results = schema.validate(data, { abortEarly: false });
    if (results.error) {
      const errorMessage = results.error.details.map((obj) => obj.message);

      return next(new Error(errorMessage, { cause: 400 }));
    }

    return next();
  };
};

export const genralFieldValidation = {
  userName: joi.string().min(3).max(60),
  email: joi.string().email(),
  password: joi.string().min(6),
  confirmPassword: joi.string().valid(joi.ref("password")),
  phone: joi.string(),
  gender: joi.string().valid("male", "female"),
  role: joi.string().valid(...Object.values(rolesType)),
  //
  id: joi.custom((value, helper) => {
    if (Types.ObjectId.isValid(value)) return true;

    return helper.message("id must be a valid ObjectId");
  }),
  content: joi.string(),
  code: joi.string().pattern(new RegExp(/^[0-9]{6}$/)),
};
