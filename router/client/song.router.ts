import { Router  } from "express";
;

const router=Router();
import {indexSongs, detailSong} from "../../controller/client/song.controller"

router.get("/:slugTopic" , indexSongs)

router.get("/detail/:slugSong" , detailSong);
export default router;