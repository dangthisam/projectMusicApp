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
exports.searchSongs = void 0;
const songs_model_1 = __importDefault(require("../../model/songs.model"));
const singer_model_1 = __importDefault(require("../../model/singer.model"));
const search_1 = __importDefault(require("../../helper/search"));
const searchSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const typeSearch = req.params.typeSearch;
    const keyword = req.query.keyword;
    const find = {
        deleted: false,
        status: "active",
    };
    let newSong = [];
    if (keyword) {
        const slug = (0, search_1.default)(keyword);
        const regexSong = new RegExp(slug, "i");
        const songs = yield songs_model_1.default.find(Object.assign({ slug: regexSong }, find));
        for (const song of songs) {
            const singer = yield singer_model_1.default.findOne({
                deleted: false,
                status: "active",
                _id: song.singerId,
            });
            newSong.push({
                _id: song.id,
                title: song.title,
                slug: song.slug,
                avatar: song.avatar,
                like: song.like,
                infoSinger: {
                    fullName: singer.fullName,
                    slug: singer.slug,
                    avatar: singer.avatar
                }
            });
        }
    }
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
});
exports.searchSongs = searchSongs;
