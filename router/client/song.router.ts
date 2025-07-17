import { Router  } from "express";
;

const router=Router();
import {indexSongs, detailSong , likeSong   , favoriteSong  , listenSong} from "../../controller/client/song.controller"
import { listenerCount } from "process";

router.get("/:slugTopic" , indexSongs)

router.get("/detail/:slugSong" , detailSong);
router.patch("/like/:typeLike/:idSong" , likeSong);

router.patch("/favorite/:typeFavorite/:idSong"  , favoriteSong)


router.patch("/listen/:idSong" , listenSong);
export default router;