import { Router } from "express";

const router = Router();
import {
  indexRoles,
  createRoles,
  createPostRole,
  deleteRoles,
  detailRoles,
  editRoles,
  editPatchRole
} from "../../controller/admin/roles.contrller";

router.get("/", indexRoles);
router.get("/create", createRoles);

router.post("/create" , createPostRole);

router.delete("/delete/:id" , deleteRoles); 

router.get("/detail/:id" , detailRoles);

router.get("/edit/:id" , editRoles);

router.patch("/edit/:id" , editPatchRole);
export default router;
