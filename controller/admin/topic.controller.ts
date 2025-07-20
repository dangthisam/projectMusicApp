import { Request, Response } from "express";
import Topic from "../../model/topic.model";
import multer from "multer";
import systemConfig from "../../config/system.config";
const upload = multer();
//[GET]  /admin/topics
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


//[GET] /admin/topics/create

export const adminCreateTopics=async (req:Request , res:Response)=>{

    res.render("admin/pages/topics/create.pug",{
        titlePage:"Them chủ đề"
    })
}

// [POST]  /admin/topics/create

export const adminPostCreateTopics=async (req:Request , res:Response)=>{
     
  let avatar="";

  if(req.body.avatar){
    avatar=req.body.avatar[0];
  }
  const data={
    title:req.body.title,
    description:req.body.description,
    status:req.body.status,
    avatar:avatar
  }

  const topics =new Topic(data);
  await topics.save();
  req.flash("success","Thêm chủ đề thành công")
  res.redirect(`${systemConfig.prefixAdmin}/topics`)

}