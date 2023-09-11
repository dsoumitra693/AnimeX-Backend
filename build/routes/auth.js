"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const authRouter = express_1.default.Router();
authRouter.post('/otp/generate', auth_1.generateOtp);
authRouter.post('/otp/verify', auth_1.verifyOtp);
// authRouter.delete('user/logout', logoutUser)
exports.default = authRouter;
