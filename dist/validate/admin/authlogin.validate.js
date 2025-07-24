"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccount = void 0;
const system_config_1 = __importDefault(require("../../config/system.config"));
const createAccount = (req, res, next) => {
    if (!req.body.email) {
        req.flash('error', 'Vui lòng nhập email!');
        res.redirect(`${system_config_1.default.prefixAdmin}/auth/login`);
        return;
    }
    if (!req.body.password) {
        req.flash('error', 'Vui lòng nhập mật khẩu!');
        res.redirect(`${system_config_1.default.prefixAdmin}/auth/login`);
        return;
    }
    next();
};
exports.createAccount = createAccount;
