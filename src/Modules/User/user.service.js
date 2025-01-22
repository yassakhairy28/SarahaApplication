import userModel from "../../DB/Models/user.model.js";
import { encrypt, decrypt } from "../../utils/encryption/encryption.js";
import { compare, hash } from "../../utils/hashing/hash.js";

export const getProfile = async (req, res, next) => {
  const { user } = req;
  user.phone = decrypt({
    cipherText: user.phone,
    segnature: process.env.SECRET_KEY,
  });
  return res.status(200).json({ success: true, user });
};

export const updateProfile = async (req, res, next) => {
  if (req.user.phone) {
    req.body.phone = encrypt({
      plainText: req.body.phone,
      signature: process.env.SECRET_KEY,
    });
  }
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    { ...req.body },
    { new: true, runValidators: true }
  );

  return res.status(200).json({ success: true, "user updated": user });
};

export const changePassword = async (req, res, next) => {
  const { oldPassword, password } = req.body;

  const comparePassword = compare({
    plainText: oldPassword,
    hash: req.user.password,
  });

  if (!comparePassword)
    return next(new Error("password is invalid", { cause: 400 }));

  const hashPassword = hash({ plainText: password });

  const updatedUser = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      password: hashPassword,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return res.status(200).json({
    success: true,
    message: "password updated successfully",
    updatedUser: updatedUser,
  });
};

export const dactivateAccount = async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      isDeleted: true,
      changedAt: new Date(),
    },
    {
      new: true,
      runValidators: true,
    }
  );
  return res.status(200).json({
    success: true,
    message: "account deleted successfully",
    user: user,
  });
};

export const deleteAccount = async (req, res, next) => {
  const user = await userModel.findByIdAndDelete(req.user._id);
  return res.status(200).json({
    success: true,
    message: "account deleted successfully",
    user: user,
  });
};
