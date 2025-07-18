import express, { Request, Response } from "express";

import Song from "../../model/songs.model";
import Topic from "../../model/topic.model";
import Singer from "../../model/singer.model";
import systemConfig from "../../config/system.config";


export const indexSongs=async (req:Request , res:Response)=>{
    const songs=await Song.find({
        deleted:false,
        status:"active"
    })
 res.render("admin/pages/songs/index.pug",{
    titlePage:"Danh sach bai hat",
    songs:songs

 })
}

export const createSong=async (req:Request , res:Response)=>{
    const songs=await Song.find({
        deleted:false,
        status:"active"
    })

    const topic=await Topic.find({
        deleted:false,
        status:"active"
    })

    const singer=await Singer.find({
        deleted:false,
        status:"active"
    })

    res.render("admin/pages/songs/create.pug",{
        titlePage:"Them bai hat",
        topics:topic,
        singers:singer
    })
    
}

export const postCreateSong=async (req:Request , res:Response)=>{

   
    let avatar="";
    let audio="";

    if(req.body.avatar){
        avatar=req.body.avatar[0];
    }

    if(req.body.audio){
        audio=req.body.audio[0];
    }

    const datasongs={
        title:req.body.title,
        topicId:req.body.topicId,
        singerId:req.body.singerId,
        description :req.body.description,
       status:req.body.status,
        avatar:avatar,
        audio:audio
      
    }
    const song=new Song(datasongs)
    await song.save();
    res.redirect(`${systemConfig.prefixAdmin}/songs`)
}

