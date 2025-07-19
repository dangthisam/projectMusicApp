import { Router  } from "express";

import {userRegister} from "../../controller/client/user.controller"


const router=Router();


router.post("/register"  , userRegister);


export default router;