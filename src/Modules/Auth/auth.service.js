import userModel from "../../DB/Models/user.model.js";
import { rolesType } from "../../meddlewares/auth.meddlewares.js";
import { activate_email } from "../../utils/email/template_activate_email.js";
import emailEmitter from "../../utils/email/eventEmail.js";
import { hash, compare } from "../../utils/hashing/hash.js";
import { encrypt } from "../../utils/encryption/encryption.js";
import { gnrateToken, verifyToken } from "./../../utils/token/token.js";

export const register = async (req, res, next) => {
  const { userName, email, password, confirmPassword, phone, role } = req.body;

  if (password != confirmPassword)
    return next(new Error("password does not match", { cause: 400 }));

  const checkUser = await userModel.findOne({ email });
  if (checkUser) return next(new Error("User Already Exist", { cause: 409 }));

  const hashpassword = hash({ plainText: password, saltRound: 10 });

  const encryptPhone = encrypt({
    plainText: phone,
    signature: process.env.SECRET_KEY,
  });
  const user = await userModel.create({
    userName,
    email,
    password: hashpassword,
    phone: encryptPhone,
    role,
  });

  emailEmitter.emit("sendEmail", user.email, user.userName);

  if (user) return res.status(201).json({ success: true, user });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) return next(new Error("Register Frist Please", { cause: 404 }));

  if (user.confirmEmail == false)
    return next(new Error("please confirm your email", { cause: 400 }));

  if (user.isDeleted == true) {
    user.isDeleted = false;
    await user.save();
  }

  const match = compare({ plainText: password, hash: user.password });
  if (!match) return next(new Error("password is invalid", { cause: 400 }));

  const token = gnrateToken({
    payload: { id: user.id, isLoggedIn: true },
    secretKey:
      user.role === rolesType.User
        ? process.env.SECRET_KEY_TOKEN
        : process.env.SECRET_KEY_TOKENADMIN,
  });

  return res.status(200).json({ success: true, token });
};

export const activateAccount = async (req, res, next) => {
  const { token } = req.params;
  const email = verifyToken({
    token: token,
    secretKey: process.env.SECRET_KEY_EMAIL,
  });
  const user = await userModel.findOne({ email });

  if (!user) return next(new Error("user Doesn`t Exist", { cause: 404 }));

  user.confirmEmail = true;
  await user.save();
  const loginUrl = "http://localhost:5000/auth/login";
  res.set("Content-Type", "text/html");
  res.status(200).send(activate_email(user.userName, loginUrl));
};

export const forgetPassword = async (req, res, next) => {
  const { email } = req.body;

  const user = await userModel.findOne({ email, isDeleted: false });

  if (!user) return next(new Error("user Doesn`t Exist", { cause: 404 }));

  emailEmitter.emit("resetPassword", user.email, user.userName);
  res.status(200).json({ success: true, message: "email sent successfully" });
};

export const resetPassword = async (req, res, next) => {
  const { email, code, password } = req.body;

  const user = await userModel.findOne({ email, isDeleted: false });
  if (!user) return next(new Error("user Doesn`t Exist", { cause: 404 }));
  if ((Date.now() - user.expireCode.getTime()) / 1000 / 60 >= 3) {
    return next(new Error("code is expired please try again", { cause: 400 }));
  }
  const compareHash = compare({ plainText: code, hash: user.forgetPassword });

  if (!compareHash) return next(new Error("code is invalid", { cause: 400 }));

  const hashPassword = hash({ plainText: password });

  user.password = hashPassword;
  user.forgetPassword = "";
  await user.save();

  res.status(200).json({ success: true, message: "password updated" });
};
