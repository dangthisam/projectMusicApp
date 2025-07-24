import mongoose from "mongoose";
import { generateRandomString } from "../helper/generateString"

const accountSchema = new mongoose.Schema(
    {
        username: { type: String, required: true},
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        token: { type: String, default: generateRandomString(20) },
        phone: String,
        avatar: { type: String, default: null },

        role_id: String,
        status: String, // 'active', 'inactive', 'banned'
        deleted: {
        type: Boolean,
        default: false,
        },
        deletedAt: { type: Date },
    },
    {
        timestamps: true,
       
    }
  
);



const account =mongoose.model('Account', accountSchema , "accounts");

export default account;
