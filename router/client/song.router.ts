import { Router  } from "express";
;

const router=Router();
import {indexSongs} from "../../controller/client/song.controller"

router.get("/:slugTopic" , indexSongs)


export default router;