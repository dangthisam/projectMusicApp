import { Router } from "express";
const router = Router();
import multer from "multer";
const upload = multer();
import * as uploadMiddleware from "../../middleware/admin/uploadCould.middleware";
import {
  topicsController,
  adminCreateTopics,
  adminPostCreateTopics,
  detailTopics
} from "../../controller/admin/topic.controller";
router.get("/", topicsController);

router.get("/create", adminCreateTopics);

router.post(
  "/create",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),

  uploadMiddleware.uploadFields,
  adminPostCreateTopics
);

router.get("/detail/:id" , detailTopics);

export default router;
