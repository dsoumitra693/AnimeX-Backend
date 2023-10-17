"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userSchema = new mongoose_1.Schema({
    name: { type: String, },
    email: { type: String },
    phone: { type: String, resquired: [true, "is require field"] },
    password: { type: String, resquired: [true, "is require field"] },
    isSubscribed: { type: Boolean, default: false },
    profileImgUrl: { type: String, default: process.env.defaultProfileImg },
    favouriteAnime: [{
            name: String,
            animeId: String,
            imgUrl: String,
        }],
    watchList: [{
            name: String,
            animeId: String,
            imgUrl: String,
        }]
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
