"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_SECRET;
const authenticateToken = (req, res, next) => {
    const token = req.cookies.tokenUser;
    if (!token)
        return res.status(401).send('Token required');
    jsonwebtoken_1.default.verify(token, secretKey, (err, user) => {
        if (err)
            return res.status(403).send('Invalid or expired token');
        req.user = user;
        console.log(user);
        next();
    });
};
exports.default = authenticateToken;
