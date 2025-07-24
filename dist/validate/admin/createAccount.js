"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPassword = exports.createAccount = void 0;
const system_config_1 = __importDefault(require("../../config/system.config"));
const createAccount = (req, res, next) => {
    if (!req.body.username) {
        req.flash('error', 'Vui lòng nhập tên đăng nhập!');
        res.redirect(`back`);
        return;
    }
    if (!req.body.password) {
        req.flash('error', 'Vui lòng nhập mật khẩu!');
        res.redirect(`${system_config_1.default.prefixAdmin}/accounts/create`);
        return;
    }
    if (!req.body.email) {
        req.flash('error', 'Vui lòng nhập email!');
        res.redirect(`${system_config_1.default.prefixAdmin}/accounts/create`);
        return;
    }
    if (!req.body.role_id) {
        req.flash('error', 'Vui lòng chọn quyền!');
        res.redirect(`${system_config_1.default.prefixAdmin}/accounts/create`);
        return;
    }
    if (!req.body.status) {
        req.flash('error', 'Vui lòng chọn trạng thái!');
        res.redirect(`${system_config_1.default.prefixAdmin}/accounts/create`);
        return;
    }
    next();
};
exports.createAccount = createAccount;
const createPassword = (req, res, next) => {
    if (!req.body.username) {
        req.flash('error', 'Vui lòng nhập tên đăng nhập!');
        res.redirect(`${system_config_1.default.prefixAdmin}/accounts/create`);
        return;
    }
    if (!req.body.email) {
        req.flash('error', 'Vui lòng nhập email!');
        res.redirect(`${system_config_1.default.prefixAdmin}/accounts/create`);
        return;
    }
    if (!req.body.role_id) {
        req.flash('error', 'Vui lòng chọn quyền!');
        res.redirect(`${system_config_1.default.prefixAdmin}/accounts/create`);
        return;
    }
    if (!req.body.status) {
        req.flash('error', 'Vui lòng chọn trạng thái!');
        res.redirect(`${system_config_1.default.prefixAdmin}/accounts/create`);
        return;
    }
    next();
};
exports.createPassword = createPassword;
