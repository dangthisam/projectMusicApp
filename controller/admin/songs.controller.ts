import express, { Request, Response } from "express";

import Song from "../../model/songs.model";


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
    res.render("admin/pages/songs/create.pug",{
        titlePage:"Them bai hat"
    })
    
}

export const postCreateSong=async (req:Request , res:Response)=>{
    const data=req.body;
    console.log(data)

}