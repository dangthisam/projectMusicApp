"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const slug = require('mongoose-slug-updater');
mongoose_1.default.plugin(slug);
const songSchema = new mongoose_1.default.Schema({
    title: String,
    avatar: String,
    description: String,
    singerId: String,
    topicId: String,
    like: {
        type: Number,
        default: 0,
    },
    position: Number,
    likedUsers: [String],
    totalListen: {
        type: Number,
        default: 0
    },
    lyrics: String,
    audio: String,
    status: String,
    slug: {
        type: String,
        slug: 'title',
        unique: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
}, {
    timestamps: true,
});
const Song = mongoose_1.default.model("Song", songSchema, "songs");
exports.default = Song;
