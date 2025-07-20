"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const PasswordResetSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, expires: 120 },
}, {
    timestamps: true
});
const PasswordReset = mongoose.model('PasswordReset', PasswordResetSchema, "passwordResets");
exports.default = PasswordReset;
