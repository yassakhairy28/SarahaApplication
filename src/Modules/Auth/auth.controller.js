import { Router } from "express";
import * as auth from "../Auth/auth.service.js";
import asyncHandler from "../../utils/error handling/asyncHandler.js";
import { validate } from "./../../meddlewares/validation.middleware.js";
import * as authValidation from "../Auth/auth.validate.js";
const authRouter = Router();

authRouter.post(
  "/register",
  validate(authValidation.registerSchema),
  asyncHandler(auth.register)
);
authRouter.post(
  "/login",
  validate(authValidation.loginSchema),
  asyncHandler(auth.login)
);
authRouter.get("/activate_account/:token", asyncHandler(auth.activateAccount));

authRouter.post(
  "/forgot_password",
  validate(authValidation.forgetPasswordSchema),
  asyncHandler(auth.forgetPassword)
);

authRouter.post(
  "/reset_password",
  validate(authValidation.resetPasswordSchema),
  asyncHandler(auth.resetPassword)
)
export default authRouter;
