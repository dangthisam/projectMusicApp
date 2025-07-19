import { Router } from "express";

import {
  userRegister,
  userLogin,
} from "../../controller/client/user.controller";
import userMiddleware from "../../middleware/client/user.middleware";
const router = Router();

router.post("/register", userRegister);
router.post("/login", 
    userMiddleware,
  userLogin);

export default router;
