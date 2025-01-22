import { Router } from "express";
import * as users from "./user.service.js";
import * as userValidation from "./user.validation.js";
import { allowTo, authentication } from "../../meddlewares/auth.meddlewares.js";
import asyncHandler from "../../utils/error handling/asyncHandler.js";
import { validate } from "../../meddlewares/validation.middleware.js";
const userRouter = Router();

userRouter.get(
  "/profile",
  authentication,
  allowTo(["User", "Admin"]),
  asyncHandler(users.getProfile)
);

userRouter.patch(
  "/",
  authentication,
  allowTo(["User"]),
  validate(userValidation.updateProfileSchema),
  asyncHandler(users.updateProfile)
);

userRouter.patch(
  "/change_password",
  authentication,
  allowTo(["User"]),
  validate(userValidation.changePasswordSchema),
  asyncHandler(users.changePassword)
);

userRouter.patch(
  "/deactivate",
  authentication,
  allowTo(["User", "Admin"]),
  asyncHandler(users.dactivateAccount)
);

userRouter.delete(
  "/",
  authentication,
  allowTo(["User", "Admin"]),
  asyncHandler(users.deleteAccount)
);
export default userRouter;
