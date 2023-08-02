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
exports.updateUserDetails = void 0;
const asyncErrorHandler_1 = __importDefault(require("../utils/asyncErrorHandler"));
const User_1 = __importDefault(require("../model/User"));
const http_errors_1 = __importDefault(require("http-errors"));
const removeUndefinedVaules_1 = require("../utils/removeUndefinedVaules");
exports.updateUserDetails = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, isSubscribed, phone } = req.query;
    let params = (0, removeUndefinedVaules_1.removeUndefinedVaules)({ name, email, isSubscribed });
    let user = yield User_1.default.findOneAndUpdate({ phone }, {
        $set: params
    });
    if (user == null)
        next((0, http_errors_1.default)(404, 'User not found'));
    user === null || user === void 0 ? void 0 : user.save();
    const userWithNoPass = Object.assign(Object.assign({}, user === null || user === void 0 ? void 0 : user.toObject()), { password: "" });
    res.send({ userWithNoPass }).status(200);
}));
