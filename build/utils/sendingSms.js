"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtp = exports.sendSMS = exports.createOtp = void 0;
const { Vonage } = require('@vonage/server-sdk');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const FROM = "AnmeX";
const createOtp = () => {
    let otp = (Math.ceil(Math.random() * 10e5)).toString();
    if (otp.length != 6)
        return (0, exports.createOtp)();
    return otp;
};
exports.createOtp = createOtp;
const vonage = new Vonage({
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET
});
const sendSMS = (number, msg) => __awaiter(void 0, void 0, void 0, function* () {
    let res = yield vonage.sms.send({ to: number, from: FROM, text: msg });
    console.log("this is response", res);
});
exports.sendSMS = sendSMS;
const sendOtp = (number, otp) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.sendSMS)(number, `<#> ${otp} is your One Time Password(OTP) for your login to the AnimeX App.Please don't share this code with anyone`);
});
exports.sendOtp = sendOtp;
