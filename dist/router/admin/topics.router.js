"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const topic_controller_1 = require("../../controller/admin/topic.controller");
router.get("/", topic_controller_1.topicsController);
exports.default = router;
