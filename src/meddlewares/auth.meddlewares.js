import { decode } from "jsonwebtoken";
import userModel from "../DB/Models/user.model.js";
import { verifyToken } from "../utils/token/token.js";
export const rolesType = {
  User: "User",
  Admin: "Admin",
};
export const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization)
      return next(new Error("token is required", { cause: 401 }));

    const [Bearer, token] = authorization.split(" ");

    let TOKEN_SAGNTURE;

    switch (Bearer) {
      case "Bearer":
        TOKEN_SAGNTURE = process.env.SECRET_KEY_TOKEN;
        break;

      case "Admin":
        TOKEN_SAGNTURE = process.env.SECRET_KEY_TOKENADMIN;
        break;

      default:
        break;
    }
    const decoded = verifyToken({ token: token, secretKey: TOKEN_SAGNTURE });
    const user = await userModel.findById(decoded.id);

    if (!user) return next(new Error("user not found", { cause: 404 }));

    if (user.isDeleted == true)
      return next(new Error("please ReActivate your account", { cause: 401 }));

    if (user.createdAt?.getTime() >= decoded.iat * 1000)
      return next(new Error("please login again", { cause: 401 }));

    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
};

export const allowTo = (roles = []) => {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new Error("forbidden Acount", { cause: 403 }));
    return next();
  };
};
