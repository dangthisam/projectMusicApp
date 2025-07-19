"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const dashboard_controller_1 = require("../../controller/admin/dashboard.controller");
router.get("/", dashboard_controller_1.dashboardIndex);
exports.default = router;
