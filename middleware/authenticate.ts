import { Request, Response, NextFunction } from 'express';
import { Schema } from 'mongoose';
import asyncErrorHandler from '../utils/asyncErrorHandler';
import User, { IUser } from '../model/User';
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export interface IRequset extends Request {
    user?: IUser
}

export const authenticate = asyncErrorHandler(
    async (req: IRequset, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        // console.log(req.headers.authorization, token)
        if (token) {
            const userData = jwt.verify(token, process.env.JWT_SECRET_KEY!) as {
                id:string
            }
            console.log(userData)
            const userId = userData?.id

            const user: IUser | null = await User.findById({ _id: userId});
            if (user) {
                req.user = user;
                return next();
            }
        } else {
            return next(createHttpError(404, 'Token not found'));
        }
    }
)