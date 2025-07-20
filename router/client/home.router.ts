import { Router } from "express";
import { home } from "../../controller/client/home.controller";
const router = Router();

router.get("/" , home);

export default router