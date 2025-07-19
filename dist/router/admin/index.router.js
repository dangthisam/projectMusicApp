"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const system_config_1 = __importDefault(require("../../config/system.config"));
const dashboard_router_1 = __importDefault(require("./dashboard.router"));
const topics_router_1 = __importDefault(require("./topics.router"));
const songs_router_1 = __importDefault(require("./songs.router"));
const upload_image_router_1 = __importDefault(require("./upload-image.router"));
const mainAdminRouter = (app) => {
    const PATH_ADMIN = `${system_config_1.default.prefixAdmin}`;
    app.use(`${PATH_ADMIN}/dashboard`, dashboard_router_1.default);
    app.use(`${PATH_ADMIN}/topics`, topics_router_1.default);
    app.use(`${PATH_ADMIN}/songs`, songs_router_1.default);
    app.use(`${PATH_ADMIN}/upload-image`, upload_image_router_1.default);
};
exports.default = mainAdminRouter;
