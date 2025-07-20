import { Router } from "express";

import {
  userRegister,
  userLogin,
  userLogout,
  userProfile,
  userChangePass,
  userChangePostPassword
} from "../../controller/client/user.controller";
import userMiddleware from "../../middleware/client/user.middleware";
import validateresetPassword from "../../validate/client/resetPassword";
const router = Router();

router.post("/register", userRegister);
router.post("/login", userMiddleware, userLogin);

router.get("/logout", userLogout);

router.get("/profile", userMiddleware, userProfile);
router.get("/change-password", userMiddleware, userChangePass);
router.post("/change-password", userMiddleware, validateresetPassword, userChangePostPassword);
export default router;
