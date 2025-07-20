import { Router } from "express";

import {
  userRegister,
  userLogin,
  userLogout,
  userProfile,
} from "../../controller/client/user.controller";
import userMiddleware from "../../middleware/client/user.middleware";
const router = Router();

router.post("/register", userRegister);
router.post("/login", userMiddleware, userLogin);

router.get("/logout", userLogout);

router.get("/profile", userMiddleware, userProfile);

export default router;
