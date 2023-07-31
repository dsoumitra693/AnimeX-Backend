"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const animeSchema = new mongoose_1.Schema({
    name: { String, isRequired: [true, "is required field"] },
    imgUrl: { String, isRequired: [true, "is required field"] },
    animeId: { String, isRequired: [true, "is required field"] }
});
const Anime = (0, mongoose_1.model)("Anime", animeSchema);
exports.default = Anime;
