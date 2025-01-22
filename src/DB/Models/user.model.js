import mongoose, { Schema } from "mongoose";
import { rolesType } from "../../meddlewares/auth.meddlewares.js";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required"],
      minLength: [3, "Username must be at least 3 characters long."],
      maxLength: [20, "Username must not exceed 20 characters."],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exist"],
      match: /^[a-zA-Z\.]+\d+@[a-z]{3,8}(\.[a-z]{2,5})+$/,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "The gender must be male or female.",
      },
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: Object.values(rolesType),
      default: rolesType.User,
    },
    DOB: String,
    phone: String,
    image: String,
    address: String,
    changedAt: Date,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    forgetPassword: String,
    expireCode: Date,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
