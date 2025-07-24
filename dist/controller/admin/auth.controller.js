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
exports.adminLoginPost = exports.indexRouterAuth = void 0;
const md5_1 = __importDefault(require("md5"));
const account_model_1 = __importDefault(require("../../model/account.model"));
const system_config_1 = __importDefault(require("../../config/system.config"));
const indexRouterAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/auth/login.pug", {
        titlePage: "Đăng nhập"
    });
});
exports.indexRouterAuth = indexRouterAuth;
const adminLoginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = (0, md5_1.default)(req.body.password);
    const find = {
        email: email,
        password: password
    };
    const account = yield account_model_1.default.findOne(find);
    if (!account) {
        req.flash("error", "Email hoặc mật khẩu không đúng");
        res.redirect(`${system_config_1.default.prefixAdmin}/auth/login`);
        return;
    }
    if (account.password !== password) {
        req.flash("error", "Email hoặc mật khẩu không đúng");
        res.redirect(`${system_config_1.default.prefixAdmin}/auth/login`);
        return;
    }
    if (account.status == "inactive") {
        req.flash("error", "Tài khoản đã bị khóa");
        res.redirect(`${system_config_1.default.prefixAdmin}/auth/login`);
        return;
    }
    res.cookie("token", account.token, {
        httpOnly: true,
        secure: false
    });
    res.redirect(`${system_config_1.default.prefixAdmin}/dashboard`);
});
exports.adminLoginPost = adminLoginPost;
