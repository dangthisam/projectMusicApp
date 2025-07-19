import { Router } from "express";
import multer from "multer";
const router = Router();
import * as uploadMiddleware from "../../middleware/admin/uploadCould.middleware";
import index from "../../controller/admin/upload.controller";
const upload = multer();
router.post("/" ,
    upload.single("file"),
    uploadMiddleware.uploadSingle,
    index)

export default router;