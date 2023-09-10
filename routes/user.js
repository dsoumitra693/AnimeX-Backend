"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const userRouter = express_1.default.Router();
userRouter.get('/', user_1.getUserDetails);
userRouter.put('/update', user_1.updateUserDetails);
userRouter.put('/fav-anime', user_1.updateFavAnime);
userRouter.get('/fav-anime', user_1.getFavAnime);
userRouter.delete('/fav-anime', user_1.deleteFavAnime);
userRouter.put('/watch-list', user_1.updateWatchList);
userRouter.get('/watch-list', user_1.getWatchList);
userRouter.delete('/watch-list', user_1.deleteWatchList);
exports.default = userRouter;
