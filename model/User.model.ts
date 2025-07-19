import mongoose from "mongoose";

import { generateRandomString, generateRandomNumber } from "../helper/generateString";
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    tokenUser:{
        type:String,
       default:generateRandomString(32)
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "" },
    deleted: { type: Boolean, default: false },
    deletedAt: Date,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema, "users");
export default User;
