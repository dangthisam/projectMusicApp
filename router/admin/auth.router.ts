import { Router } from "express";
const router = Router();
import {
  indexRouterAuth,
  adminLoginPost,
} from "../../controller/admin/auth.controller";
import * as validateAdminLogin from "../../validate/admin/authlogin.validate";

router.get("/login", indexRouterAuth);
router.post("/login", validateAdminLogin.createAccount, adminLoginPost);
export default router;
