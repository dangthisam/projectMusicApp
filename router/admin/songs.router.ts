import { Router  } from "express";
const router=Router();
import { indexSongs , createSong } from "../../controller/admin/songs.controller";
router.get("/" , indexSongs);

router.get("/create" , createSong)

export default router;