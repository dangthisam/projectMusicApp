"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_model_1 = __importDefault(require("../../model/User.model"));
const validateNewPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUser = req.cookies.tokenUser;
    const user = yield User_model_1.default.findOne({
        tokenUser: tokenUser,
        deleted: false,
        status: "active"
    });
    if (!req.body.newPassword) {
        req.flash('error', 'Vui lòng nhập mật khẩu!');
        res.redirect("/user/password/reset");
        return;
    }
    if (req.body.newPassword.length < 6) {
        req.flash('error', 'Mật khẩu phải có ít nhất 6 ký tự!');
        res.redirect("/user/password/reset");
        return;
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        req.flash('error', 'Mật khẩu không khớp!');
        res.redirect("/user/password/reset");
        return;
    }
    next();
});
exports.default = validateNewPassword;
