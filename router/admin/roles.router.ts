import { Router } from "express";

const router = Router();
import {
  indexRoles,
  createRoles,
} from "../../controller/admin/roles.contrller";

router.get("/", indexRoles);
router.get("/create", createRoles);
export default router;
