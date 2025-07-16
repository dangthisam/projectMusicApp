import { Router  } from "express";
;

const router=Router();
import {indexSongs, detailSong , likeSong   , favoriteSong} from "../../controller/client/song.controller"

router.get("/:slugTopic" , indexSongs)

router.get("/detail/:slugSong" , detailSong);
router.patch("/like/:typeLike/:idSong" , likeSong);

router.patch("/favorite/:typeFavorite/:idSong"  , favoriteSong)
export default router;