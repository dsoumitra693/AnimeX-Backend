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
exports.verifyOtp = exports.generateOtp = void 0;
const sendingSms_1 = require("../utils/sendingSms");
const password_1 = require("../utils/password");
const User_1 = __importDefault(require("../model/User"));
const asyncErrorHandler_1 = __importDefault(require("../utils/asyncErrorHandler"));
const http_errors_1 = __importDefault(require("http-errors"));
const authToken_1 = require("../utils/authToken");
exports.generateOtp = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const phone = req.query.phone;
    const otp = (0, sendingSms_1.createOtp)();
    const hashedOtp = yield (0, password_1.encOtp)(otp);
    const user = yield User_1.default.findOne({ phone });
    // await sendOtp(phone, otp)
    if (user == null) {
        const newUser = new User_1.default({ phone, password: hashedOtp });
        yield newUser.save();
    }
    else {
        user.password = hashedOtp;
        user === null || user === void 0 ? void 0 : user.save();
    }
    res.send({ "msg": "otp generated" });
}));
exports.verifyOtp = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const phone = req.query.phone;
    const otp = req.query.otp;
    console.log(phone);
    const user = yield User_1.default.findOne({ phone });
    console.log(user);
    if (user == null)
        next((0, http_errors_1.default)(404, 'User not found'));
    const hashedOtp = user === null || user === void 0 ? void 0 : user.password;
    const isMatched = yield (0, password_1.compareOtp)(otp, hashedOtp);
    if (isMatched) {
        const userObj = { id: user === null || user === void 0 ? void 0 : user._id, name: user === null || user === void 0 ? void 0 : user.name, email: user === null || user === void 0 ? void 0 : user.email, phone: user === null || user === void 0 ? void 0 : user.phone, isSubscribed: user === null || user === void 0 ? void 0 : user.isSubscribed };
        const token = yield (0, authToken_1.generateToken)({ id: userObj.id }).catch(err => next((0, http_errors_1.default)(500, err)));
        return res.send({
            "msg": "user verified",
            data: {
                userObj,
                token
            }
        }).status(200);
    }
    next((0, http_errors_1.default)(400, "otp did not match"));
}));
