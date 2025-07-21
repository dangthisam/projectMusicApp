import { Request, Response } from "express";
import Topic from "../../model/topic.model";
import Song from "../../model/songs.model";
import multer from "multer";
import search from "../../helper/search";
import systemConfig from "../../config/system.config";
import objectPagination from "../../helper/pagination";
import filter from "../../helper/filterStatus";
const upload = multer();
//[GET]  /admin/topics
export const topicsController=async (req:Request , res:Response)=>{
  const find={
    deleted:false,
   

  }


   
  const filterStatus=filter(req.query.status as string);
if(req.query.status){
  find["status"]=req.query.status;
}
    //start pagination 
 const countProducts = await Topic.countDocuments(find);
  let objectPagi = objectPagination(
        {
          currentPage:1,
          limitPage:4
        },
        req.query,
        countProducts
      )
    //end pagination

    //start search 
    const keyword:string=req.query.keyword as string;
    if(keyword){
      const slug=search(keyword);
      const regex=new RegExp(slug,"i");
      find["$or"]=[
        {
          title:regex
        },
        {
          slug:regex
        },
        {
          description:regex
        }
      ]
    }
    //end search)
 const topics=await Topic.find(find)
  .skip(objectPagi.skip)
  .limit(objectPagi.limitPage)
     
   res.render("admin/pages/topics/index.pug",{
    titlePage:" Quản lý chủ đề",
    topics:topics,
    pagination:objectPagi,
    filterStatus:filterStatus,
    keyword:keyword
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
    const countTopics=await Topic.countDocuments({
      deleted:false,
      status:"active"
    });
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

// [GET]  /topics/edit/:id

export const editTopics=async (req:Request , res:Response)=>{
  const topicId=req.params.id;
  const topic=await Topic.findById({
    _id:topicId,
    deleted:false,
    status:"active"
    })
  res.render("admin/pages/topics/edit.pug",{
    titlePage:"Chỉnh sửa chủ đề",
    topic:topic
  })
}


//[PATCH]  /topics/edit/:id

export const editPatchTopics=async (req:Request , res:Response)=>{

 
const topicId=req.params.id;
 const data={
  title:req.body.title,
  description:req.body.description,
  status:req.body.status,

 position:req.body.position

 }
  if(req.body.avatar){
    data["avatar"]=req.body.avatar[0];
  }


 await Topic.updateOne({
  _id:topicId
 },data)

 req.flash("success"  , "Chỉnh sửa chủ đề thành công")
 res.redirect(`${systemConfig.prefixAdmin}/topics`)

}


//  [DELETE] /admin/topics/delete/:id

export const deleteTopics=async (req:Request , res:Response)=>{
  const idTopic=req.params.id;
  await Topic.updateOne({
    _id:idTopic
  },{
    deleted:true
  })
 req.flash("success"  , "Xóa chủ đề thành công")
  res.redirect(`${systemConfig.prefixAdmin}/topics`)
}

// [ PATCH]   /admin/topics/change-status/:status/:id
export const changeStatusTopics=async (req:Request , res:Response)=>{
  const idTopic:string=req.params.id;
  const status:string=req.params.status;
  await Topic.updateOne({
    _id:idTopic
  },{
    status:status
  })

  req.flash("success"  , "Thay đổi trạng thái chủ đề thành công")
  res.redirect(`${systemConfig.prefixAdmin}/topics`)
}


// [PATCH ]  /admin/topics/change-multi

export const changeMulStatusTopics=async (req:Request , res:Response)=>{
const ids=req.body.ids.split(",");
const type=req.body.type;

switch (type) {
  case "active":
    await Topic.updateMany({
      _id:{$in:ids}
    },{
      status:"active"
    })

    req.flash("success"  , `Cập nhật trạng thái cho ${ids.length} chủ đề thành công`)
    res.redirect(`${systemConfig.prefixAdmin}/topics`)

    break;
  case "inactive":
   await Topic.updateMany({
      _id:{$in:ids}
    },{
      status:"inactive"
    })
    req.flash("success" , `Cập nhật trạng thái cho ${ids.length} chủ đề thành công`)
    res.redirect(`${systemConfig.prefixAdmin}/topics`)
    break;

case "delete-all":
  await Topic.updateMany({
    _id:{$in:ids}
  },{
    deleted:true
  })
  req.flash("success" , `Xóa chủ đề ${ids.length} chủ đề thành công`)
  res.redirect(`${systemConfig.prefixAdmin}/topics`)
  break;
 case "update-position":
        for (const item of ids){
          let [id, position] = item.split("-"); // Tách ID và vị trí từ chuỗi
          position = parseInt(position); // Chuyển đổi vị trí thành số nguyên
          await Topic.updateOne(
            { _id: id },
            { position: position 
              
            },
           
          );
        }
        req.flash('success', `đã cập nhật vị trí cho ${ids.length} sản phẩm!`);
        break
  default:
    break;
}
res.redirect(`${systemConfig.prefixAdmin}/topics`)

}