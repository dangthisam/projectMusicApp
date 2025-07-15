
import { Request, Response } from "express";
import Song from "../../model/songs.model";
import Topic from "../../model/topic.model";
import Singer from "../../model/singer.model";

export const indexSongs= async (req:Request , res:Response) =>{
    console.log(req.params.slugTopic)

    const topic =await Topic.findOne({
        slug:req.params.slugTopic,
        deleted:false,
        status:"active"
    
    })

    const songs=await Song.find({
        topicId:topic.id,
        deleted:false,
        status:"active"
    })

  for (const song of songs){
    const singer=await Singer.findOne({
        _id:song.singerId,
        deleted:false,
        status:"active"
    })
    song["infoSinger"]=singer;
  }





    res.render("client/pages/songs/list.pug",{
        titlePage:"Danh sach bai hat",
        songs:songs
    })

}