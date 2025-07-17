import { Router  } from "express";
import multer from "multer";
const router=Router();
import { indexSongs , createSong  , postCreateSong } from "../../controller/admin/songs.controller";
const upload=multer()
router.get("/" , indexSongs);

router.get("/create" , createSong)

router.post("/create",
    upload.single("avatar"),
     postCreateSong)

export default router;