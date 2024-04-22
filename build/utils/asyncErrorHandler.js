"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const asyncErrorHandler = (func) => {
    return (req, res, next) => func(req, res, next).catch(error => {
        let statusCode = 500;
        let message = error instanceof Error ? error.message : 'Server Error';
        next((0, http_errors_1.default)(statusCode, message));
    });
};
exports.default = asyncErrorHandler;
