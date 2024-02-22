import { Router } from "express";
import { proxyController } from "../controllers/proxy";

const proxyRouter = Router()

proxyRouter.get('/', proxyController)

export default proxyRouter