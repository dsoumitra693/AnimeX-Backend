import { Request, Response, NextFunction } from 'express';
declare const asyncErrorHandler: (func: (req: Request, res: Response, next: NextFunction) => Promise<any>) => (req: Request, res: Response, next: NextFunction) => Promise<any>;
export default asyncErrorHandler;
