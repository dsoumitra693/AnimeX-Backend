import { Request, Response, NextFunction } from 'express';
import asyncErrorHandler from '../utils/asyncErrorHandler';
import User, { IUser } from '../model/User';
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export interface IRequest extends Request {
    userId?: string
}

export const authenticate = asyncErrorHandler(
    async (req: IRequest, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if (token) {
            const userData = jwt.verify(token, process.env.JWT_SECRET_KEY!) as {
                id:string
            }
            const userId = userData?.id

            const user: IUser | null = await User.findById({ _id: userId});
            if (user) {
                req.userId = user._id;
                return next();
            }
        } else {
            return next(createHttpError(403, 'Token not found'));
        }
    }
)