"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../../controller/client/user.controller");
const user_middleware_1 = __importDefault(require("../../middleware/client/user.middleware"));
const router = (0, express_1.Router)();
router.post("/register", user_controller_1.userRegister);
router.post("/login", user_middleware_1.default, user_controller_1.userLogin);
router.get("/logout", user_controller_1.userLogout);
router.get("/profile", user_middleware_1.default, user_controller_1.userProfile);
exports.default = router;
