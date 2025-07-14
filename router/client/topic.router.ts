import { Router , Request , Response  } from "express";
import Topic from "../../model/topic.model";

const router=Router();


router.get("/" , async (req:Request , res:Response) =>{
   const data=await Topic.findOne({
    deleted:false 
  })
  console.log(data)
  res.render("client/pages/topics/index")
})


export default router;