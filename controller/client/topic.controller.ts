
import Topic from "../../model/topic.model"
import { Request, Response } from "express";


export const indexTopic= async (req:Request , res:Response) =>{
   const topics=await Topic.find({
    deleted:false 
  })

  res.render("client/pages/topics/index",{
    titlePage:"Chu de bai hat",
    topics:topics
  })
}