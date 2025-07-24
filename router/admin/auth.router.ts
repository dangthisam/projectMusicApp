import {Router} from "express";
const router=Router();
import { indexRouterAuth } from "../../controller/admin/auth.controller"

router.get("/login" , indexRouterAuth);
export default router;