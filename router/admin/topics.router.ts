import { Router  } from "express";
const router=Router();
import { topicsController } from "../../controller/admin/topic.controller";
router.get("/" , topicsController);

export default router;