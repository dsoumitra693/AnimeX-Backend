"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proxy_1 = require("../controllers/proxy");
const proxyRouter = (0, express_1.Router)();
proxyRouter.get('/', proxy_1.proxyController);
exports.default = proxyRouter;
