import { Request, Response } from "express";
import Topic from "../../model/topic.model";
import Song from "../../model/songs.model";
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
  if(req.body.position==""){
    const countTopics=await Topic.countDocuments();
    req.body.position=countTopics+1;
  }
  const data={
    title:req.body.title,
    description:req.body.description,
    status:req.body.status,
    avatar:avatar,
    position:req.body.position
  }

  const topics =new Topic(data);
  await topics.save();
  req.flash("success","Thêm chủ đề thành công")
  res.redirect(`${systemConfig.prefixAdmin}/topics`)

}

// [GET] /topics/detail/:id
export const detailTopics=async (req:Request , res:Response)=>{
  const topicId=req.params.id;
  const topic=await Topic.findById({
    _id:topicId,
    deleted:false,
    status:"active"
  })

  const songs=await Song.find({
    topicId:topicId,
    deleted:false,
    status:"active"
  })


  res.render("admin/pages/topics/detail.pug",{
    titlePage:"Chi tiết chủ đề",
    topic:topic,
    songs:songs
  })

}