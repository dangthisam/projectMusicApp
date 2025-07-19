"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const favorite_songs_controller_1 = require("../../controller/client/favorite-songs.controller");
{ }
const router = (0, express_1.Router)();
router.get("/", favorite_songs_controller_1.indexFavoriteSongs);
exports.default = router;
