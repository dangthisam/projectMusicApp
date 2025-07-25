"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const slug = require('mongoose-slug-updater');
mongoose_1.default.plugin(slug);
const topicSchema = new mongoose_1.default.Schema({
    title: String,
    avatar: String,
    status: String,
    description: String,
    deleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        accountID: String,
        createdAt: {
            type: Date,
            default: Date.now()
        }
    },
    position: Number,
    slug: {
        type: String,
        slug: 'title',
        unique: true,
    },
    deletedAt: Date,
}, {
    timestamps: true
});
const Topic = mongoose_1.default.model("Topic", topicSchema, "topics");
exports.default = Topic;
