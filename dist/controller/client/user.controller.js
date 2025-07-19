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
exports.userLogout = exports.userLogin = exports.userRegister = void 0;
const User_model_1 = __importDefault(require("../../model/User.model"));
const md5_1 = __importDefault(require("md5"));
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const exitsEmail = yield User_model_1.default.findOne({
        email: req.body.email
    });
    if (exitsEmail) {
        req.flash("error", "Email đã tồn tại ");
        res.redirect("/topics");
        return;
    }
    req.body.password = (0, md5_1.default)(req.body.password);
    const user = new User_model_1.default(req.body);
    yield user.save();
    req.flash("success", "Đăng ký thành công");
    res.redirect("/topics");
});
exports.userRegister = userRegister;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = (0, md5_1.default)(req.body.password);
    const user = yield User_model_1.default.findOne({
        email,
        deleted: false,
    });
    if (!user) {
        req.flash("error", "Email không tồn tại");
        res.redirect("/topics");
        return;
    }
    if (user.password !== password) {
        req.flash("error", "Mật khẩu không đúng");
        res.redirect("/topics");
        return;
    }
    if (user.status == "inactive") {
        req.flash("error", "Tài khoản chưa được kích hoạt");
        res.redirect("/topics");
        return;
    }
    res.cookie("tokenUser", user.tokenUser);
    req.flash("success", "Đăng nhập thành công");
    res.redirect("/topics");
});
exports.userLogin = userLogin;
const userLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("tokenUser");
    req.flash("success", "Đăng xuất thành công");
    res.redirect("/topics");
});
exports.userLogout = userLogout;
