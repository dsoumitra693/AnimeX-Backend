/// <reference types="qs" />
import { Request, NextFunction, Response } from "express";
export declare const proxyController: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<any>;
