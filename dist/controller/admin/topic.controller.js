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
exports.deleteTopics = exports.editPatchTopics = exports.editTopics = exports.detailTopics = exports.adminPostCreateTopics = exports.adminCreateTopics = exports.topicsController = void 0;
const topic_model_1 = __importDefault(require("../../model/topic.model"));
const songs_model_1 = __importDefault(require("../../model/songs.model"));
const multer_1 = __importDefault(require("multer"));
const search_1 = __importDefault(require("../../helper/search"));
const system_config_1 = __importDefault(require("../../config/system.config"));
const pagination_1 = __importDefault(require("../../helper/pagination"));
const upload = (0, multer_1.default)();
const topicsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        deleted: false,
        status: "active"
    };
    const countProducts = yield topic_model_1.default.countDocuments(find);
    let objectPagi = (0, pagination_1.default)({
        currentPage: 1,
        limitPage: 4
    }, req.query, countProducts);
    const keyword = req.query.keyword;
    if (keyword) {
        const slug = (0, search_1.default)(keyword);
        const regex = new RegExp(slug, "i");
        find["$or"] = [
            {
                title: regex
            },
            {
                slug: regex
            },
            {
                description: regex
            }
        ];
    }
    const topics = yield topic_model_1.default.find(find)
        .skip(objectPagi.skip)
        .limit(objectPagi.limitPage);
    res.render("admin/pages/topics/index.pug", {
        titlePage: " Quản lý chủ đề",
        topics: topics,
        pagination: objectPagi,
        keyword: keyword
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
    if (req.body.position == "") {
        const countTopics = yield topic_model_1.default.countDocuments({
            deleted: false,
            status: "active"
        });
        req.body.position = countTopics + 1;
    }
    const data = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        avatar: avatar,
        position: req.body.position
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
const editTopics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topicId = req.params.id;
    const topic = yield topic_model_1.default.findById({
        _id: topicId,
        deleted: false,
        status: "active"
    });
    res.render("admin/pages/topics/edit.pug", {
        titlePage: "Chỉnh sửa chủ đề",
        topic: topic
    });
});
exports.editTopics = editTopics;
const editPatchTopics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topicId = req.params.id;
    const data = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        position: req.body.position
    };
    if (req.body.avatar) {
        data["avatar"] = req.body.avatar[0];
    }
    yield topic_model_1.default.updateOne({
        _id: topicId
    }, data);
    req.flash("success", "Chỉnh sửa chủ đề thành công");
    res.redirect(`${system_config_1.default.prefixAdmin}/topics`);
});
exports.editPatchTopics = editPatchTopics;
const deleteTopics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idTopic = req.params.id;
    yield topic_model_1.default.updateOne({
        _id: idTopic
    }, {
        deleted: true
    });
    req.flash("success", "Xóa chủ đề thành công");
    res.redirect(`${system_config_1.default.prefixAdmin}/topics`);
});
exports.deleteTopics = deleteTopics;
