import joi from "joi";
import { genralFieldValidation } from "../../meddlewares/validation.middleware.js";

export const sendMsgSchema = joi.object({
  content: genralFieldValidation.content.required(),
  receiver: genralFieldValidation.id.required(),
});

export const singleMsgSchema = joi.object({
  messageId: genralFieldValidation.id.required(),
});

export const flags = {
  inbox: "inbox",
  outbox: "outbox",
};

export const allMsgsSchema = joi
  .object({
    flag: joi
      .string()
      .valid(...Object.values(flags))
      .required(),
  })
  .required();

export const updateMsgSchema = joi.object({
  newMessage: genralFieldValidation.content.required(),
  messageId: genralFieldValidation.id.required(),
});
