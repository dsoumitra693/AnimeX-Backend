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
exports.mediaInfo = exports.streamUrls = exports.searchMedia = void 0;
const extensions_1 = require("@consumet/extensions");
const asyncErrorHandler_1 = __importDefault(require("../utils/asyncErrorHandler"));
const http_errors_1 = __importDefault(require("http-errors"));
const axios_1 = __importDefault(require("axios"));
const API_URL = "https://consumet-api-951q.onrender.com";
const flixhq = new extensions_1.MOVIES.FlixHQ();
exports.searchMedia = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { mediaName } = req.params;
    let response = yield axios_1.default.get(`https://consumet-api-951q.onrender.com/movies/flixhq/${mediaName}?page=1`);
    console.log(response.data);
    if (response.data == null)
        return next((0, http_errors_1.default)(404, 'Movie not found'));
    res.send(response.data);
}));
exports.streamUrls = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { episodeId, mediaId } = req.query;
    let response = yield axios_1.default.get(`https://consumet-api-951q.onrender.com/movies/flixhq/watch?episodeId=${episodeId}&mediaId=${mediaId}`);
    console.log(response.data);
    if (response.data == null)
        return next((0, http_errors_1.default)(404, 'Movie not found'));
    res.send(response.data);
}));
exports.mediaInfo = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.body.params;
    let response = yield axios_1.default.get(`https://consumet-api-951q.onrender.com/movies/flixhq/info?id=${id}`);
    console.log(response.data);
    if (response.data == null)
        return next((0, http_errors_1.default)(404, 'Movie not found'));
    res.send(response.data);
}));
