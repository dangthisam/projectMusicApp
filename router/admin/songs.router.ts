import { Router } from "express";
import multer from "multer";
const router = Router();
import {
  indexSongs,
  createSong,
  postCreateSong,
  editSongs,
  editPatchSongs
} from "../../controller/admin/songs.controller";
import * as uploadMiddleware from "../../middleware/admin/uploadCould.middleware";
const upload = multer();
router.get("/", indexSongs);

router.get("/create", createSong);

router.post(
  "/create",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),

  uploadMiddleware.uploadFields,
  postCreateSong
);

router.get("/edit/:id", editSongs);

router.patch(
  "/edit/:id",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  uploadMiddleware.uploadFields,

  editPatchSongs
);

export default router;
