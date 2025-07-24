"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth_controller_1 = require("../../controller/admin/auth.controller");
router.get("/login", auth_controller_1.indexRouterAuth);
exports.default = router;
