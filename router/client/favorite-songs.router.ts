import { Router  } from "express";

import {indexFavoriteSongs} from "../../controller/client/favorite-songs.controller"

{}
const router=Router();


router.get("/" ,indexFavoriteSongs);


export default router;