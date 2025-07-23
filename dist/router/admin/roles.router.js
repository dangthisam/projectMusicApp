"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const roles_contrller_1 = require("../../controller/admin/roles.contrller");
router.get("/", roles_contrller_1.indexRoles);
router.get("/create", roles_contrller_1.createRoles);
exports.default = router;
