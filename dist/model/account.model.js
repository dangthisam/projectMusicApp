"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const generateString_1 = require("../helper/generateString");
const accountSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    token: { type: String, default: (0, generateString_1.generateRandomString)(20) },
    phone: String,
    avatar: { type: String, default: null },
    role_id: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: { type: Date },
}, {
    timestamps: true,
});
const account = mongoose_1.default.model('Account', accountSchema, "accounts");
exports.default = account;
