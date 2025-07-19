"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const search_song_controller_1 = require("../../controller/client/search-song.controller");
const router = (0, express_1.Router)();
router.get("/:typeSearch", search_song_controller_1.searchSongs);
exports.default = router;
