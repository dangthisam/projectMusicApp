"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const system_config_1 = __importDefault(require("../../config/system.config"));
const dashboard_router_1 = __importDefault(require("./dashboard.router"));
const topics_router_1 = __importDefault(require("./topics.router"));
const songs_router_1 = __importDefault(require("./songs.router"));
const upload_image_router_1 = __importDefault(require("./upload-image.router"));
const roles_router_1 = __importDefault(require("./roles.router"));
const account_router_1 = __importDefault(require("./account.router"));
const auth_router_1 = __importDefault(require("./auth.router"));
const authMiddleware = __importStar(require("../../middleware/admin/auth.middleware"));
const mainAdminRouter = (app) => {
    const PATH_ADMIN = `${system_config_1.default.prefixAdmin}`;
    app.use(`${PATH_ADMIN}/dashboard`, authMiddleware.checkLoginSuccess, dashboard_router_1.default);
    app.use(`${PATH_ADMIN}/topics`, authMiddleware.checkLoginSuccess, topics_router_1.default);
    app.use(`${PATH_ADMIN}/songs`, authMiddleware.checkLoginSuccess, songs_router_1.default);
    app.use(`${PATH_ADMIN}/upload-image`, authMiddleware.checkLoginSuccess, upload_image_router_1.default);
    app.use(`${PATH_ADMIN}/roles`, authMiddleware.checkLoginSuccess, roles_router_1.default);
    app.use(`${PATH_ADMIN}/accounts`, authMiddleware.checkLoginSuccess, account_router_1.default);
    app.use(`${PATH_ADMIN}/auth`, auth_router_1.default);
};
exports.default = mainAdminRouter;
