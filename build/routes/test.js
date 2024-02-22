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
const axios_1 = __importDefault(require("axios"));
const express_1 = require("express");
const testRouter = (0, express_1.Router)();
const url = "https://img.flixhq.to/xxrz/250x400/379/85/a0/85a064832dcda25e88285be7f88aec4f/85a064832dcda25e88285be7f88aec4f.jpg";
testRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Make a GET request to the specified URL to fetch the image
    let response = yield axios_1.default.get(url, {
        responseType: 'arraybuffer' // Set responseType to 'arraybuffer' to get binary data
    });
    // Set the content type header to indicate that the response contains an image
    res.setHeader('Content-Type', 'image/jpeg');
    // Send the image data in the response body
    res.send(response.data);
}));
exports.default = testRouter;
