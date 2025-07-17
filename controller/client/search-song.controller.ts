import { Request, Response } from "express";
import Song from "../../model/songs.model";
import Singer from "../../model/singer.model";
import searchSlug from "../../helper/search";
export const searchSongs = async (req: Request, res: Response) => {
  const typeSearch: string = req.params.typeSearch;
  const keyword: string = req.query.keyword as string;

  const find: any = {
    deleted: false,
    status: "active",
  };

  let newSong = [];
  if (keyword) {
    const slug = searchSlug(keyword);
    const regexSong = new RegExp(slug, "i");
    const songs = await Song.find({
      slug: regexSong,
      ...find,
    });
    for (const song of songs) {
      const singer = await Singer.findOne({
        deleted: false,
        status: "active",
        _id: song.singerId,
      });

 

      newSong.push({
        _id:song.id,
        title:song.title,
        slug:song.slug,
        avatar:song.avatar,
        like:song.like,
        infoSinger:{
            fullName:singer.fullName,
          slug:singer.slug,
          avatar:singer.avatar
        }

      })
    }

  }
  //end search products


  switch (typeSearch) {
    case "result":
      res.render("client/pages/search/result.pug", {
        titlePage: "Kết quả tìm kiếm",
        keyword: keyword,
        songs: newSong,
      });

      break;

    case "suggest":
      res.json({
        code: 200,
        message: "Suggest thanh cong",
        songs: newSong,
      });

    default:
      break;
  }
};
