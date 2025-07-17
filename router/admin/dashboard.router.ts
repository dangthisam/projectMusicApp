import { Router  } from "express";
const router=Router();
import { dashboardIndex } from "../../controller/admin/dashboard.controller";
router.get("/" , dashboardIndex);

export default router;