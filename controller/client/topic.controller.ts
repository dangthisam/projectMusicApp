import { title } from "process";
import Topic from "../../model/topic.model"
import { Request, Response } from "express";


export const indexTopic= async (req:Request , res:Response) =>{
   const data=await Topic.findOne({
    deleted:false 
  })
  console.log(data)
  res.render("client/pages/topics/index",{
    titlePage:"Chu de bai hat"
  })
}