"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("../controllers/api");
const apiRouter = express_1.default.Router();
apiRouter.get('/v1/search/:mediaName', api_1.searchMedia);
apiRouter.get('/v1/watch', api_1.streamUrls);
apiRouter.get('/v1/info', api_1.mediaInfo);
exports.default = apiRouter;
