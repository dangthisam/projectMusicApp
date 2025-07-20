
import { Request, Response } from "express";
import Topic from "../../model/topic.model";
import Song from "../../model/songs.model";
import Singer from "../../model/singer.model";
export const home = async (req: Request, res: Response) => {

const topic =await Topic.find({
    deleted:false,
    status:"active"
})

const topLikedSongs=await Song.find({
    deleted:false,
    status:"active"
}).sort({
    like:-1
}).limit(10)




for (const song of topLikedSongs){
    const singer=await Singer.findOne({
        _id:song.singerId,
        deleted:false,
        status:"active"
    })

    song["infoSinger"]=singer;

}

const topListenSongs=await Song.find({
    deleted:false,
    status:"active"
}).sort({
    totalListen:-1
}).limit(10)


for (const song of topListenSongs){
    const singer=await Singer.findOne({
        _id:song.singerId,
        deleted:false,
        status:"active"
    })

    song["infoSinger"]=singer;


}


    res.render("client/pages/home/index.pug", {
    titlePage: "Trang chủ",
    topics:topic,
    topLikedSongs:topLikedSongs,
    topListenedSongs:topListenSongs
  
  
  
  });

}