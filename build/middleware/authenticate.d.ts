/// <reference types="qs" />
import { Request, Response, NextFunction } from 'express';
export interface IRequest extends Request {
    userId?: string;
}
export declare const authenticate: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<any>;
