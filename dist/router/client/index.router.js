"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const topic_router_1 = __importDefault(require("./topic.router"));
const song_router_1 = __importDefault(require("./song.router"));
const favorite_songs_router_1 = __importDefault(require("./favorite-songs.router"));
const search_router_1 = __importDefault(require("./search.router"));
const auth_router_1 = __importDefault(require("./auth.router"));
const home_router_1 = __importDefault(require("./home.router"));
const mainV1Router = (app) => {
    app.use("/", home_router_1.default);
    app.use("/topics", topic_router_1.default);
    app.use("/songs", song_router_1.default);
    app.use("/favorite-songs", favorite_songs_router_1.default);
    app.use("/search", search_router_1.default);
    app.use("/user", auth_router_1.default);
};
exports.default = mainV1Router;
