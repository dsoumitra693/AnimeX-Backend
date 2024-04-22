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
exports.getWatchList = exports.deleteWatchList = exports.deleteProfileImg = exports.uploadProfileImg = exports.updateWatchList = exports.getFavAnime = exports.deleteFavAnime = exports.updateFavAnime = exports.getUserDetails = exports.updateUserDetails = void 0;
const asyncErrorHandler_1 = __importDefault(require("../utils/asyncErrorHandler"));
const User_1 = __importDefault(require("../model/User"));
const uuid_1 = require("uuid");
const filterNonNullValues_1 = require("../utils/filterNonNullValues");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.updateUserDetails = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { name, email, isSubscribed, } = req.query;
    let params = (0, filterNonNullValues_1.filterNonNullValues)({
        name, email, isSubscribed
    });
    let user = yield User_1.default.findOne({ _id: userId });
    if (user == null)
        return res.status(403).send({ msg: "User not found" });
    user = Object.assign(Object.assign({}, user), params);
    user === null || user === void 0 ? void 0 : user.save();
    const userWithNoPass = Object.assign(Object.assign({}, user === null || user === void 0 ? void 0 : user.toObject()), { password: "" });
    res.send({ userWithNoPass }).status(200);
}));
exports.getUserDetails = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUserId = req.userId;
    let user = yield User_1.default.findOne({ _id: reqUserId });
    if (user == null)
        return res.status(403).json("User not found");
    const userWithNoPass = Object.assign(Object.assign({}, user === null || user === void 0 ? void 0 : user.toObject()), { password: "" });
    res.send({ user: userWithNoPass }).status(200);
}));
exports.updateFavAnime = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const animeId = req.body.animeId;
    const name = req.body.name;
    const imgUrl = req.body.imgUrl;
    const user = yield User_1.default.findOne({ _id: userId });
    if (user == null)
        return res.status(403).send({ msg: "User not found" });
    const found = user.favouriteAnime.some(el => (el === null || el === void 0 ? void 0 : el.animeId) === animeId);
    if (!found) {
        user.favouriteAnime.push({ animeId, name, imgUrl });
        yield user.save();
        return res.send({ favouriteAnime: user === null || user === void 0 ? void 0 : user.favouriteAnime }).status(200);
    }
    return res.send({ favouriteAnime: user === null || user === void 0 ? void 0 : user.favouriteAnime }).status(200);
}));
exports.deleteFavAnime = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { animeId } = req.body;
    const user = yield User_1.default.findOne({ _id: userId });
    if (user == null)
        return res.status(403).send({ msg: "User not found" });
    const found = user.favouriteAnime.some(el => (el === null || el === void 0 ? void 0 : el.animeId) === animeId);
    if (found) {
        user.favouriteAnime = user.favouriteAnime.filter(item => item.animeId != animeId);
    }
    else {
        user.favouriteAnime = [];
    }
    yield user.save();
    return res.send({ favouriteAnime: user.favouriteAnime }).status(200);
}));
exports.getFavAnime = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const user = yield User_1.default.findOne({ _id: userId });
    if (user != null) {
        return res.send({ favouriteAnime: user.favouriteAnime }).status(200);
    }
    return res.status(404).send({ msg: "User not found" });
}));
exports.updateWatchList = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const animeId = req.body.animeId;
    const name = req.body.name;
    const imgUrl = req.body.imgUrl;
    const user = yield User_1.default.findOne({ _id: userId });
    if (user == null)
        return res.status(403).send({ msg: "User not found" });
    const found = user.watchList.some(el => (el === null || el === void 0 ? void 0 : el.animeId) === animeId);
    if (!found) {
        user.watchList.push({ animeId, name, imgUrl });
        console.log(user);
        yield user.save();
        return res.send({ watchList: user === null || user === void 0 ? void 0 : user.watchList }).status(200);
    }
    return res.send({ watchList: user === null || user === void 0 ? void 0 : user.watchList }).status(200);
}));
exports.uploadProfileImg = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const profileImg = req.body.profileImg;
    const imgId = (0, uuid_1.v4)();
    let imgUrl;
    imgUrl = ''; //await uploadImage(profileImg, imgId)
    let user = yield User_1.default.findOne({ _id: userId });
    if (user == null)
        return res.status(403).send({ msg: "User not found" });
    if (!!profileImg)
        user = Object.assign(Object.assign({}, user), { profileImgUrl: imgUrl });
    user === null || user === void 0 ? void 0 : user.save();
    return res.send({ profileImg: imgUrl }).status(200);
}));
exports.deleteProfileImg = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const defaultProfileImg = process.env.defaultProfileImg;
    const userId = req.userId;
    let user = yield User_1.default.findOneAndUpdate({ _id: userId }, {
        $set: {
            profileImg: defaultProfileImg
        }
    });
    if (user == null)
        return res.status(403).send({ msg: "User not found" });
    user === null || user === void 0 ? void 0 : user.save();
    res.send({ profileImg: defaultProfileImg }).status(200);
}));
exports.deleteWatchList = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { animeId } = req.body;
    const user = yield User_1.default.findOne({ _id: userId });
    if (user == null)
        return res.status(403).send({ msg: "User not found" });
    const found = user.watchList.some(el => (el === null || el === void 0 ? void 0 : el.animeId) === animeId);
    if (found) {
        user.watchList = user.watchList.filter(item => item.animeId != animeId);
    }
    else {
        user.watchList = [];
    }
    yield user.save();
    return res.send({ watchList: user.watchList }).status(200);
}));
exports.getWatchList = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const user = yield User_1.default.findOne({ _id: userId });
    if (user != null) {
        return res.send({ watchList: user.watchList }).status(200);
    }
    return res.status(404).send({ msg: "User not found" });
}));
