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
exports.detailTopics = exports.adminPostCreateTopics = exports.adminCreateTopics = exports.topicsController = void 0;
const topic_model_1 = __importDefault(require("../../model/topic.model"));
const songs_model_1 = __importDefault(require("../../model/songs.model"));
const multer_1 = __importDefault(require("multer"));
const system_config_1 = __importDefault(require("../../config/system.config"));
const upload = (0, multer_1.default)();
const topicsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topic_model_1.default.find({
        deleted: false,
        status: "active"
    });
    res.render("admin/pages/topics/index.pug", {
        titlePage: " Quản lý chủ đề",
        topics: topics
    });
});
exports.topicsController = topicsController;
const adminCreateTopics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/topics/create.pug", {
        titlePage: "Them chủ đề"
    });
});
exports.adminCreateTopics = adminCreateTopics;
const adminPostCreateTopics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let avatar = "";
    if (req.body.avatar) {
        avatar = req.body.avatar[0];
    }
    const data = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        avatar: avatar
    };
    const topics = new topic_model_1.default(data);
    yield topics.save();
    req.flash("success", "Thêm chủ đề thành công");
    res.redirect(`${system_config_1.default.prefixAdmin}/topics`);
});
exports.adminPostCreateTopics = adminPostCreateTopics;
const detailTopics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topicId = req.params.id;
    const topic = yield topic_model_1.default.findById({
        _id: topicId,
        deleted: false,
        status: "active"
    });
    const songs = yield songs_model_1.default.find({
        topicId: topicId,
        deleted: false,
        status: "active"
    });
    res.render("admin/pages/topics/detail.pug", {
        titlePage: "Chi tiết chủ đề",
        topic: topic,
        songs: songs
    });
});
exports.detailTopics = detailTopics;
