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
const axios_1 = __importDefault(require("axios"));
const asyncErrorHandler_1 = __importDefault(require("../utils/asyncErrorHandler"));
const providerUrl = process.env.PROVIDER_URL;
exports.searchMedia = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { mediaName } = req.params;
    let url = `${providerUrl}/${mediaName}`;
    let response = yield axios_1.default.get(url);
    res.send(response.data).status(200);
}));
exports.streamUrls = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { episodeId } = req.query;
    let url = `${providerUrl}/watch/${episodeId}`;
    const response = yield axios_1.default.get(url);
    res.status(200).send(response.data);
}));
exports.mediaInfo = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.query;
    let url = `${providerUrl}/info/${id}`;
    const response = yield axios_1.default.get(url);
    res.status(200).send(response.data);
}));
