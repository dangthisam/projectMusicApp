import { Router } from "express";

const router = Router();
import {
  indexRoles,
  createRoles,
  createPostRole,
  deleteRoles
} from "../../controller/admin/roles.contrller";

router.get("/", indexRoles);
router.get("/create", createRoles);

router.post("/create" , createPostRole);

router.delete("/delete/:id" , deleteRoles); 
export default router;
