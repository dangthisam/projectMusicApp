import { Router } from "express";

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
