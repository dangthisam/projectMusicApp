"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiration: '10h',
};
exports.default = jwt;
