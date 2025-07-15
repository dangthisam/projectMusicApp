import { Router  } from "express";
;

const router=Router();
import {indexSongs, detailSong , likeSong} from "../../controller/client/song.controller"

router.get("/:slugTopic" , indexSongs)

router.get("/detail/:slugSong" , detailSong);
router.get("/like/:typeLike/:idSong" , likeSong);
export default router;