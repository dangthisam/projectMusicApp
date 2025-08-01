import { Request, Response } from "express";
import Song from "../../model/songs.model";
import Topic from "../../model/topic.model";
import Singer from "../../model/singer.model";
import FavoriteSongs from "../../model/favorite-songs.model";
import User from "../../model/User.model";
export const indexSongs = async (req: Request, res: Response) => {
  const topic = await Topic.findOne({
    slug: req.params.slugTopic,
    deleted: false,
    status: "active",
  });

  const songs = await Song.find({
    topicId: topic.id,
    deleted: false,
    status: "active",
  });

  for (const song of songs) {
    const singer = await Singer.findOne({
      _id: song.singerId,
      deleted: false,
      status: "active",
    });
    song["infoSinger"] = singer;
  }

  res.render("client/pages/songs/list.pug", {
    titlePage: "Danh sach bai hat",
    songs: songs,
  });
};

export const detailSong = async (req: Request, res: Response) => {
  const slugSong: string = req.params.slugSong;
  const song = await Song.findOne({
    slug: slugSong,
    deleted: false,
    status: "active",
  });
  const singer = await Singer.findOne({
    _id: song.singerId,
    deleted: false,
    status: "active",
  }).select("fullName");

  const topic = await Topic.findOne({
    _id: song.topicId,
    deleted: false,
    status: "active",
  }).select("title");
  const favoriteSong = await FavoriteSongs.findOne({
    songId: song.id,
    deleted: false,
  });

  if (favoriteSong) {
    song["isFavorite"] = true;
  } else {
    song["isFavorite"] = false;
  }

  res.render("client/pages/songs/detail.pug", {
    titlePage: "Chi tiet bai hat",
    song: song,
    singer: singer,
    topic: topic,
  });
};

export const likeSong = async (req: Request, res: Response) => {
  const idSong: string = req.params.idSong;

  const typeLike: string = req.params.typeLike;
  const tokenUser = req.cookies.tokenUser;

  const song = await Song.findOne({
    _id: idSong,
    deleted: false,
    status: "active",
  });

  const user = await User.findOne({
    tokenUser: tokenUser,
    deleted: false,
    status: "active",
  });

  const userId = user.id;
  if(!userId){
    req.flash("error" , "Bạn cần đăng nhập để thực hiện tính năng này")
    res.redirect("/topics")
    return;
  }
  const alreadyLiked = song.likedUsers
    .map((id) => id.toString())
    .includes(userId);

  if (typeLike === "like" && !alreadyLiked) {
    song.likedUsers.push(userId);
  } else {
    song.likedUsers = song.likedUsers.filter((id) => id.toString() !== userId);
  }

  song.like = song.likedUsers.length;
  await song.save();


  res.json({
    code: 200,
    message: "Like thanh cong",
    like: song.like,
  });
};

export const favoriteSong = async (req: Request, res: Response) => {
  const idSong: string = req.params.idSong; // id bài hát
  const tokenUser: string = req.cookies.tokenUser; // token user
  const typeFavorite: string = req.params.typeFavorite;

  switch (typeFavorite) {
    case "favorite":
      const dataFavorite = new FavoriteSongs({
        songId: idSong,
        userId: tokenUser,
      });
      await dataFavorite.save();

      break;
    case "unfavorite":
      await FavoriteSongs.deleteOne({
        songId: idSong,
        userId: tokenUser,
      });
      break;

    default:
      break;
  }

  res.json({
    code: 200,
    message: "Favorite thanh cong",
  });
};

export const listenSong = async (req: Request, res: Response) => {
  const songId = req.params.idSong;
  const songs = await Song.findOne({
    _id: songId,
    deleted: false,
    status: "active",
  });

  const listen = songs.totalListen + 1;
  await Song.updateOne(
    {
      _id: songId,
    },
    {
      totalListen: listen,
    }
  );

  const dataSong = await Song.findOne({
    _id: songId,
    deleted: false,
    status: "active",
  });

  res.json({
    code: 200,
    message: "Listen thanh cong",
    listen: dataSong.totalListen,
  });
};
