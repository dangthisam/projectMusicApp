import { Router  } from "express";


import {searchSongs} from "../../controller/client/search-song.controller"

const router=Router();


router.get("/:typeSearch" ,searchSongs);




export default router;