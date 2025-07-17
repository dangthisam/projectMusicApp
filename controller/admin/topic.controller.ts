import { Request, Response } from "express";
import Topic from "../../model/topic.model";
export const topicsController=async (req:Request , res:Response)=>{

    const topics=await Topic.find({
        deleted:false,
        status:"active"
    })
   res.render("admin/pages/topics/index.pug",{
    titlePage:" Quản lý chủ đề",
    topics:topics
   })
}