"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = (email, subject, html) => {
    const transporter = nodemailer_1.default.createTransport({
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASS,
        },
    });
    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: subject,
        html: html,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log("Error sending email: ", error);
        }
        console.log("Email sent: ", info.response);
    });
};
exports.default = sendEmail;
