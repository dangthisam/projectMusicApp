import { Router } from "express";
import multer from "multer";
const router = Router();
import {indexRoles} from "../../controller/admin/roles.contrller";

router.get("/", indexRoles);

export default router;