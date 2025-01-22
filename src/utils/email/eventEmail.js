import { sendEmail, subject } from "./sendEmail.js";
import { signUp } from "./template_send_email.js";
import { EventEmitter } from "events";
import { customAlphabet } from "nanoid";
import { hash } from "./../hashing/hash.js";
import userModel from "../../DB/Models/user.model.js";
import { gnrateToken } from "../token/token.js";
import { resetPassword } from "./template_forget_password.js";

const emailEmitter = new EventEmitter();

emailEmitter.on("sendEmail", async (email, userName) => {
  const token = gnrateToken({
    payload: email,
    secretKey: process.env.SECRET_KEY_EMAIL,
  });
  const link = `http://localhost:5000/auth/activate_account/${token}`;
  const isSent = await sendEmail({
    to: email,
    subject: subject.register,
    html: signUp(link, userName),
  });
});

emailEmitter.on("resetPassword", async (email, userName) => {
  const otp = customAlphabet("0123456789", 6)();
  const hashOtp = hash({ plainText: otp });

  await userModel.findOneAndUpdate(
    { email },
    { forgetPassword: hashOtp, expireCode: Date.now() }
  );
  const isSent = await sendEmail({
    to: email,
    subject: subject.resetPassword,
    html: resetPassword(otp, userName),
  });
});

export default emailEmitter;
