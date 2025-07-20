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
exports.passWordResetPost = exports.passWordReset = exports.userVerifyOtp = exports.userPasswordOtp = exports.userPostForgotpassword = exports.userForgotpassword = exports.userChangePostPassword = exports.userChangePass = exports.userProfile = exports.userLogout = exports.userLogin = exports.userRegister = void 0;
const User_model_1 = __importDefault(require("../../model/User.model"));
const md5_1 = __importDefault(require("md5"));
const sendMail_1 = __importDefault(require("../../helper/sendMail"));
const forgotPassword_1 = __importDefault(require("../../model/forgotPassword"));
const generateString_1 = require("../../helper/generateString");
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
const userProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUser = req.cookies.tokenUser;
    const user = yield User_model_1.default.findOne({
        tokenUser: tokenUser,
        deleted: false
    });
    res.render("client/pages/user/profile.pug", {
        titlePage: "Trang cá nhân",
        user: user
    });
});
exports.userProfile = userProfile;
const userChangePass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/user/change-password.pug", {
        titlePage: "Đổi mật khẩu"
    });
});
exports.userChangePass = userChangePass;
const userChangePostPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPassword = (0, md5_1.default)(req.body.newPassword);
    const tokenUser = req.cookies.tokenUser;
    yield User_model_1.default.updateOne({
        tokenUser: tokenUser
    }, {
        password: newPassword
    });
    req.flash("success", "Đổi mật khẩu thành công");
    res.redirect("profile");
});
exports.userChangePostPassword = userChangePostPassword;
const userForgotpassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/user/forgot-password.pug", {
        titlePage: " Lấy lại mật khẩu"
    });
});
exports.userForgotpassword = userForgotpassword;
const userPostForgotpassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const user = yield User_model_1.default.findOne({
        email: email,
        deleted: false,
        status: "active"
    });
    if (!user) {
        req.flash("error", "Email không tồn tại");
        res.redirect("back");
        return;
    }
    const OTP = (0, generateString_1.generateRandomNumber)(8);
    const expiresAt = Date.now() + 120000;
    const objectForgotPassword = {
        email: email,
        otp: OTP,
        expiresAt: expiresAt
    };
    const passwordReset = new forgotPassword_1.default(objectForgotPassword);
    const subject = "Mã OTP để đặt lại mật khẩu";
    const html = `Mã OTP để  láy lại mật khẩu là ${OTP}`;
    (0, sendMail_1.default)(email, subject, html);
    yield passwordReset.save();
    res.redirect(`password/otp?email=${email}`);
});
exports.userPostForgotpassword = userPostForgotpassword;
const userPasswordOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    res.render("client/pages/user/enterNewpasswordOTP", {
        titlePage: "Nhập OTP",
        email: email
    });
});
exports.userPasswordOtp = userPasswordOtp;
const userVerifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const otp = req.body.otp;
    req.session.resetEmail = email;
    req.session.otpVerified = true;
    res.redirect("/user/password/reset");
});
exports.userVerifyOtp = userVerifyOtp;
const passWordReset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.session.otpVerified || !req.session.resetEmail) {
        req.flash("error", "Phiên làm việc đã hết hạn");
        res.redirect("/user/forgot-password");
        return;
    }
    res.render("client/pages/user/reset-password.pug", {
        titlePage: "Đặt lại mật khẩu"
    });
});
exports.passWordReset = passWordReset;
const passWordResetPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.session.otpVerified || !req.session.resetEmail) {
        req.flash("error", "Phiên làm việc đã hết hạn");
        res.redirect("/user/forgot-password");
        return;
    }
    const password = (0, md5_1.default)(req.body.newPassword);
    const email = req.session.resetEmail;
    yield User_model_1.default.findOneAndUpdate({
        email: email,
        deleted: false
    }, {
        password: password
    });
    delete req.session.resetEmail;
    delete req.session.otpVerified;
    req.flash("success", "Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại");
    res.redirect("/topics");
});
exports.passWordResetPost = passWordResetPost;
