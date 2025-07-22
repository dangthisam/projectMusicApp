"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const user_controller_1 = require("../../controller/client/user.controller");
const user_middleware_1 = __importDefault(require("../../middleware/client/user.middleware"));
const resetPassword_1 = __importDefault(require("../../validate/client/resetPassword"));
const newpassword_validata_1 = __importDefault(require("../../validate/client/newpassword.validata"));
const router = (0, express_1.Router)();
router.get('/auth/google', passport_1.default.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
}));
router.get('/auth/google/callback', passport_1.default.authenticate('google', {
    failureRedirect: '/?error=google_login_failed',
    failureFlash: true
}), (req, res) => {
    const user = req.user;
    res.cookie("tokenUser", user.tokenUser);
    req.flash('success', 'Đăng nhập thành công!');
    res.redirect('/');
});
router.post("/register", user_controller_1.userRegister);
router.post("/login", user_middleware_1.default, user_controller_1.userLogin);
router.get("/logout", user_controller_1.userLogout);
router.get("/profile", user_middleware_1.default, user_controller_1.userProfile);
router.get("/change-password", user_middleware_1.default, user_controller_1.userChangePass);
router.post("/change-password", user_middleware_1.default, resetPassword_1.default, user_controller_1.userChangePostPassword);
router.get("/forgot-password", user_controller_1.userForgotpassword);
router.post("/forgot-password", user_controller_1.userPostForgotpassword);
router.get("/password/otp", user_controller_1.userPasswordOtp);
router.post("/password/otp", user_controller_1.userVerifyOtp);
router.get("/password/reset", user_controller_1.passWordReset);
router.post("/password/reset", newpassword_validata_1.default, user_controller_1.passWordResetPost);
exports.default = router;
