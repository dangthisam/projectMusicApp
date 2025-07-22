"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const generateString_1 = require("../helper/generateString");
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    tokenUser: {
        type: String,
        default: (0, generateString_1.generateRandomString)(32)
    },
    email: { type: String, required: true },
    password: { type: String, },
    profilePicture: { type: String, default: "" },
    googleId: { type: String, unique: true, sparse: true },
    authProvider: { type: String, enum: ['local', 'google'], default: 'local' },
    status: { type: String, default: "active" },
    deleted: { type: Boolean, default: false },
    deletedAt: Date,
}, { timestamps: true });
const User = mongoose_1.default.model("User", userSchema, "users");
exports.default = User;
