import { Router } from "express";
import passport from "passport";
import {
  userRegister,
  userLogin,
  userLogout,
  userProfile,
  userChangePass,
  userChangePostPassword,
  userForgotpassword,
  userPostForgotpassword,
  userPasswordOtp,
  userVerifyOtp,
  passWordReset,
  passWordResetPost,

} from "../../controller/client/user.controller";
import userMiddleware from "../../middleware/client/user.middleware";
import validateresetPassword from "../../validate/client/resetPassword";
import validateNewPassword from "../../validate/client/newpassword.validata";

const router = Router();
// Bắt đầu Google OAuth
router.get('/auth/google', 
  passport.authenticate('google', { 
    scope: ['profile', 'email'] ,
    prompt: 'select_account'
  })
)

router.get('/auth/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/?error=google_login_failed',
    failureFlash: true 
  }),
  (req, res) => {
    // Đăng nhập thành công
    const user = req.user;
    res.cookie("tokenUser" , user.tokenUser)
    req.flash('success', 'Đăng nhập thành công!');
    res.redirect('/');
  }
)
router.post("/register", userRegister);
router.post("/login", userMiddleware, userLogin);

router.get("/logout", userLogout);

router.get("/profile", userMiddleware, userProfile);
router.get("/change-password", userMiddleware, userChangePass);
router.post("/change-password", userMiddleware, validateresetPassword, userChangePostPassword);

router.get("/forgot-password" , userForgotpassword);

router.post("/forgot-password" , userPostForgotpassword);

router.get("/password/otp" , userPasswordOtp);

router.post("/password/otp" , userVerifyOtp);

router.get("/password/reset" , passWordReset);

router.post("/password/reset"  ,validateNewPassword, passWordResetPost);


export default router;
