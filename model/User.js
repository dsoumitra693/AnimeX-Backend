"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, },
    email: { type: String },
    phone: { type: String, resquired: [true, "is require field"] },
    password: { type: String, resquired: [true, "is require field"] },
    isSubscribed: { type: Boolean, default: false },
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
