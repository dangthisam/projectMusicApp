import {Router} from "express";
const router=Router();
import { indexAccount } from "../../controller/admin/account.controller";

import multer from "multer";
const upload = multer();
import * as uploadMiddleware from "../../middleware/admin/uploadCould.middleware";

router.get("/" , indexAccount);

export default router;