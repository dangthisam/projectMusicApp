"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const account_controller_1 = require("../../controller/admin/account.controller");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
router.get("/", account_controller_1.indexAccount);
exports.default = router;
