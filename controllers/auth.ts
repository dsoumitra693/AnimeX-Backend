import { Request, Response, NextFunction } from "express";
import { createOtp, sendOtp } from "../utils/sendingSms";
import { compareOtp, encOtp } from "../utils/password";
import User, { IUser } from "../model/User";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import createHttpError from 'http-errors';
import { generateToken } from "../utils/authToken";
import { Schema } from "mongoose";

export const generateOtp = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const phone = req.query.phone as string
        const otp = createOtp()
        const hashedOtp = await encOtp(otp)

        const user: IUser | null = await User.findOne({ phone })

        // await sendOtp(phone, otp)
        if (user == null) {
            const newUser = new User({ phone, password: hashedOtp })
            await newUser.save()
        } else {
            user.password = hashedOtp as string
            user?.save()
        }


        res.json({ "msg": "otp generated" })
    })
export const verifyOtp = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const phone = req.query.phone as string
        const otp = req.query.otp as string

        const user: IUser | null = await User.findOne({ phone })

        if (user == null) next(createHttpError(404, 'User not found'));

        const hashedOtp = user?.password as string

        const isMatched = await compareOtp(otp, hashedOtp)

        if (isMatched) {
            const userObj = { id: user?._id as Schema.Types.ObjectId, name: user?.name, email: user?.email, phone: user?.phone, isSubscribed: user?.isSubscribed }
            const token = await generateToken(userObj.id).catch(err => next(createHttpError(500, err)))
            return res.send({
                "msg": "user verified",
                data: {
                    userObj,
                    token
                }
            }).status(200)
        }
        next(createHttpError(400, "otp did not match"))

    })