import FavoriteSongs from "../../model/favorite-songs.model";
import { Request, Response } from "express"
import Song from "../../model/songs.model"
import Singer from "../../model/singer.model";

export const indexFavoriteSongs=async (req:Request , res:Response)=>{
    const favoriteSongs=await FavoriteSongs.find({
        deleted:false,
       userId:req.cookies.tokenUser
    })

    for (const favoriteSong of favoriteSongs){
        const songs=await Song.findOne({
            _id:favoriteSong.songId,
            deleted:false,
            status:"active"
        })

        const singer=await Singer.findOne({
            _id:songs.singerId,
            deleted:false,
            status:"active"
        })

        favoriteSong["infoSinger"]=singer;
        favoriteSong["infoSong"]=songs;
    }
  

    res.render("client/pages/favorite-songs/index",{
        titlePage:"Danh sach bai hat yeu thich",
        favoriteSongs:favoriteSongs
    })


}