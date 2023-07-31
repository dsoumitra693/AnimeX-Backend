import { Request, Response, NextFunction } from "express";
import asyncErrorHandler from "../utils/asyncErrorHandler"
import { removeUndefinedVaules } from "../utils/removeUndefinedVaules";
import User, { IUser } from "../model/User";
import createHttpError from 'http-errors'


export const updateUserDetails = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { name, email, isSubscribed, phone } = req.query
        let params = removeUndefinedVaules({ name, email, isSubscribed })
        let user: IUser | null = await User.findOneAndUpdate(
            { phone },
            {
                $set: params
            })
        if (user == null) next(createHttpError(404, 'User not found'));

        user?.save()

        const userWithNoPass = {...user?.toObject(), password: "" }
        res.send({ userWithNoPass }).status(200)

    })