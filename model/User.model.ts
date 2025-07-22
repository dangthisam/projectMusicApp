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
    password: { type: String, },
    profilePicture: { type: String, default: "" },
googleId: { type: String, unique: true, sparse: true },
authProvider: { type: String, enum: ['local', 'google'], default: 'local' },
    status: { type: String, default: "active" },
    deleted: { type: Boolean, default: false },
    deletedAt: Date,
    
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema, "users");
export default User;
