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
exports.editPatchSongs = exports.editSongs = exports.postCreateSong = exports.createSong = exports.indexSongs = void 0;
const songs_model_1 = __importDefault(require("../../model/songs.model"));
const topic_model_1 = __importDefault(require("../../model/topic.model"));
const singer_model_1 = __importDefault(require("../../model/singer.model"));
const system_config_1 = __importDefault(require("../../config/system.config"));
const indexSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield songs_model_1.default.find({
        deleted: false,
        status: "active"
    });
    res.render("admin/pages/songs/index.pug", {
        titlePage: "Danh sach bai hat",
        songs: songs
    });
});
exports.indexSongs = indexSongs;
const createSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield songs_model_1.default.find({
        deleted: false,
        status: "active"
    });
    const topic = yield topic_model_1.default.find({
        deleted: false,
        status: "active"
    });
    const singer = yield singer_model_1.default.find({
        deleted: false,
        status: "active"
    });
    res.render("admin/pages/songs/create.pug", {
        titlePage: "Them bai hat",
        topics: topic,
        singers: singer
    });
});
exports.createSong = createSong;
const postCreateSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let avatar = "";
    let audio = "";
    if (req.body.avatar) {
        avatar = req.body.avatar[0];
    }
    if (req.body.audio) {
        audio = req.body.audio[0];
    }
    const datasongs = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        avatar: avatar,
        audio: audio,
        lyrics: req.body.lyrics,
    };
    const song = new songs_model_1.default(datasongs);
    yield song.save();
    res.redirect(`${system_config_1.default.prefixAdmin}/songs`);
});
exports.postCreateSong = postCreateSong;
const editSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songId = req.params.id;
    const song = yield songs_model_1.default.findById({
        _id: songId,
        deleted: false,
        status: "active"
    });
    const topic = yield topic_model_1.default.find({
        _id: song.topicId,
        deleted: false,
        status: "active"
    });
    const singer = yield singer_model_1.default.find({
        _id: song.singerId,
        deleted: false,
        status: "active"
    });
    res.render("admin/pages/songs/edit.pug", {
        titlePage: "Chỉnh sửa bài hát",
        song: song,
        topics: topic,
        singers: singer
    });
});
exports.editSongs = editSongs;
const editPatchSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const datasongs = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        lyrics: req.body.lyrics,
    };
    if (req.body.avatar) {
        datasongs["avatar"] = req.body.avatar[0];
    }
    if (req.body.audio) {
        datasongs["audio"] = req.body.audio[0];
    }
    yield songs_model_1.default.updateOne({
        _id: req.params.id
    }, datasongs);
    res.redirect(`${system_config_1.default.prefixAdmin}/songs`);
});
exports.editPatchSongs = editPatchSongs;
