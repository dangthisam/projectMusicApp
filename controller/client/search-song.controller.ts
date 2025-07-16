import { Request, Response } from "express";
import Song from "../../model/songs.model";
import Singer from "../../model/singer.model";
import searchSlug from "../../helper/search";
 export const searchSongs= async (req:Request , res:Response) =>{
   const keyword :string =req.query.keyword as string;

   const find:any={
    deleted:false,
    status:"active"
   }

   let newSong=[]
    if(keyword){
       const slug=searchSlug(keyword)
            const regexSong=new RegExp(slug , "i")
        const songs=await Song.find({
            slug :regexSong,
            ...find
        })
          for (const song of songs){
            const singer=await Singer.findOne({
                deleted:false,
                status:"active",
                _id:song.singerId

            })

            song["infoSinger"]=singer;
          }
      newSong=songs

}
    //end search products
 
res.render("client/pages/search/result.pug" , {
    titlePage:"Kết quả tìm kiếm",
    keyword:keyword,
    songs:newSong

})
}