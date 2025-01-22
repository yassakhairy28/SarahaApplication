import { Router } from "express";
import * as messages from "./message.service.js";
import asyncHandler from "../../utils/error handling/asyncHandler.js";
import { allowTo, authentication } from "../../meddlewares/auth.meddlewares.js";
import { validate } from "../../meddlewares/validation.middleware.js";
import * as messageValidation from "./message.validation.js";
const messageRouter = Router();

// send message
messageRouter.post(
  "/",
  authentication,
  allowTo(["User"]),
  validate(messageValidation.sendMsgSchema),
  asyncHandler(messages.sendMessage)
);

// get single message
messageRouter.get(
  "/:messageId",
  authentication,
  allowTo(["User", "Admin"]),
  validate(messageValidation.singleMsgSchema),
  asyncHandler(messages.getMessage)
);

// get all messages
messageRouter.get(
  "/",
  authentication,
  allowTo(["User"]),
  validate(messageValidation.allMsgsSchema),
  asyncHandler(messages.getAllMessages)
);

// update message
messageRouter.patch(
  "/:messageId",
  authentication,
  allowTo(["User"]),
  validate(messageValidation.updateMsgSchema),
  asyncHandler(messages.updateMessage)
);

// delete message
messageRouter.delete(
  "/:messageId",
  authentication,
  allowTo(["User", "Admin"]),
  validate(messageValidation.singleMsgSchema),
  asyncHandler(messages.deleteMessage)
);
export default messageRouter;
