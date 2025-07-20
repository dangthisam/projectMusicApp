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
exports.home = void 0;
const topic_model_1 = __importDefault(require("../../model/topic.model"));
const songs_model_1 = __importDefault(require("../../model/songs.model"));
const singer_model_1 = __importDefault(require("../../model/singer.model"));
const home = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topic = yield topic_model_1.default.find({
        deleted: false,
        status: "active"
    });
    const topLikedSongs = yield songs_model_1.default.find({
        deleted: false,
        status: "active"
    }).sort({
        like: -1
    }).limit(10);
    for (const song of topLikedSongs) {
        const singer = yield singer_model_1.default.findOne({
            _id: song.singerId,
            deleted: false,
            status: "active"
        });
        song["infoSinger"] = singer;
    }
    const topListenSongs = yield songs_model_1.default.find({
        deleted: false,
        status: "active"
    }).sort({
        totalListen: -1
    }).limit(10);
    for (const song of topListenSongs) {
        const singer = yield singer_model_1.default.findOne({
            _id: song.singerId,
            deleted: false,
            status: "active"
        });
        song["infoSinger"] = singer;
    }
    res.render("client/pages/home/index.pug", {
        titlePage: "Trang chủ",
        topics: topic,
        topLikedSongs: topLikedSongs,
        topListenedSongs: topListenSongs
    });
});
exports.home = home;
