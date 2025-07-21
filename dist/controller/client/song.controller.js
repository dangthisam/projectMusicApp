"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listenSong = exports.favoriteSong = exports.likeSong = exports.detailSong = exports.indexSongs = void 0;
const songs_model_1 = __importDefault(require("../../model/songs.model"));
const topic_model_1 = __importDefault(require("../../model/topic.model"));
const singer_model_1 = __importDefault(require("../../model/singer.model"));
const favorite_songs_model_1 = __importDefault(require("../../model/favorite-songs.model"));
const User_model_1 = __importDefault(require("../../model/User.model"));
const indexSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topic = yield topic_model_1.default.findOne({
        slug: req.params.slugTopic,
        deleted: false,
        status: "active",
    });
    const songs = yield songs_model_1.default.find({
        topicId: topic.id,
        deleted: false,
        status: "active",
    });
    for (const song of songs) {
        const singer = yield singer_model_1.default.findOne({
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
});
exports.indexSongs = indexSongs;
const detailSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugSong = req.params.slugSong;
    const song = yield songs_model_1.default.findOne({
        slug: slugSong,
        deleted: false,
        status: "active",
    });
    const singer = yield singer_model_1.default.findOne({
        _id: song.singerId,
        deleted: false,
        status: "active",
    }).select("fullName");
    const topic = yield topic_model_1.default.findOne({
        _id: song.topicId,
        deleted: false,
        status: "active",
    }).select("title");
    const favoriteSong = yield favorite_songs_model_1.default.findOne({
        songId: song.id,
        deleted: false,
    });
    if (favoriteSong) {
        song["isFavorite"] = true;
    }
    else {
        song["isFavorite"] = false;
    }
    res.render("client/pages/songs/detail.pug", {
        titlePage: "Chi tiet bai hat",
        song: song,
        singer: singer,
        topic: topic,
    });
});
exports.detailSong = detailSong;
const likeSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const typeLike = req.params.typeLike;
    const tokenUser = req.cookies.tokenUser;
    const song = yield songs_model_1.default.findOne({
        _id: idSong,
        deleted: false,
        status: "active",
    });
    const user = yield User_model_1.default.findOne({
        tokenUser: tokenUser,
        deleted: false,
        status: "active",
    });
    const userId = user.id;
    if (!userId) {
        req.flash("error", "Bạn cần đăng nhập để thực hiện tính năng này");
        res.redirect("/topics");
        return;
    }
    const alreadyLiked = song.likedUsers
        .map((id) => id.toString())
        .includes(userId);
    if (typeLike === "like" && !alreadyLiked) {
        song.likedUsers.push(userId);
    }
    else {
        song.likedUsers = song.likedUsers.filter((id) => id.toString() !== userId);
    }
    song.like = song.likedUsers.length;
    yield song.save();
    console.log(song);
    res.json({
        code: 200,
        message: "Like thanh cong",
        like: song.like,
    });
});
exports.likeSong = likeSong;
const favoriteSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const tokenUser = req.cookies.tokenUser;
    const typeFavorite = req.params.typeFavorite;
    switch (typeFavorite) {
        case "favorite":
            const dataFavorite = new favorite_songs_model_1.default({
                songId: idSong,
                userId: tokenUser,
            });
            yield dataFavorite.save();
            break;
        case "unfavorite":
            yield favorite_songs_model_1.default.deleteOne({
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
});
exports.favoriteSong = favoriteSong;
const listenSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songId = req.params.idSong;
    const songs = yield songs_model_1.default.findOne({
        _id: songId,
        deleted: false,
        status: "active",
    });
    const listen = songs.totalListen + 1;
    yield songs_model_1.default.updateOne({
        _id: songId,
    }, {
        totalListen: listen,
    });
    const dataSong = yield songs_model_1.default.findOne({
        _id: songId,
        deleted: false,
        status: "active",
    });
    res.json({
        code: 200,
        message: "Listen thanh cong",
        listen: dataSong.totalListen,
    });
});
exports.listenSong = listenSong;
