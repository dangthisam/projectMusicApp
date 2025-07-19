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
exports.indexFavoriteSongs = void 0;
const favorite_songs_model_1 = __importDefault(require("../../model/favorite-songs.model"));
const songs_model_1 = __importDefault(require("../../model/songs.model"));
const singer_model_1 = __importDefault(require("../../model/singer.model"));
const indexFavoriteSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const favoriteSongs = yield favorite_songs_model_1.default.find({
        deleted: false,
    });
    for (const favoriteSong of favoriteSongs) {
        const songs = yield songs_model_1.default.findOne({
            _id: favoriteSong.songId,
            deleted: false,
            status: "active"
        });
        const singer = yield singer_model_1.default.findOne({
            _id: songs.singerId,
            deleted: false,
            status: "active"
        });
        favoriteSong["infoSinger"] = singer;
        favoriteSong["infoSong"] = songs;
    }
    res.render("client/pages/favorite-songs/index", {
        titlePage: "Danh sach bai hat yeu thich",
        favoriteSongs: favoriteSongs
    });
});
exports.indexFavoriteSongs = indexFavoriteSongs;
