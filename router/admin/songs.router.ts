import { Router  } from "express";
import multer from "multer";
const router=Router();
import { indexSongs , createSong  , postCreateSong } from "../../controller/admin/songs.controller";
import * as uploadMiddleware from "../../middleware/admin/uploadCould.middleware";
const upload=multer()
router.get("/" , indexSongs);

router.get("/create" , createSong)

router.post("/create",
    upload.single("avatar"),
    uploadMiddleware.uploadSingle,
     postCreateSong)

export default router;