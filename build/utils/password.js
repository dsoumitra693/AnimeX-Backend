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
exports.compareOtp = exports.encOtp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT_ROUND = 10;
const encOtp = (otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hash = bcrypt_1.default.hash(otp, SALT_ROUND);
        return hash;
    }
    catch (error) {
        let msg = "encription failed";
        if (error instanceof Error)
            msg = error.message;
        throw new Error(msg);
    }
});
exports.encOtp = encOtp;
const compareOtp = (userOtp, hashedOtp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isMatch = yield bcrypt_1.default.compare(userOtp, hashedOtp);
        return isMatch;
    }
    catch (error) {
        console.error('Otp comparison error:', error);
        let message = 'Otp comparison error';
        if (error instanceof Error)
            message = error.message;
        throw new Error(message);
    }
});
exports.compareOtp = compareOtp;
