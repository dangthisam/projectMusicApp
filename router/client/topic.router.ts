import { Router  } from "express";
;

const router=Router();
import {indexTopic} from "../../controller/client/topic.controller"

router.get("/" , indexTopic)


export default router;