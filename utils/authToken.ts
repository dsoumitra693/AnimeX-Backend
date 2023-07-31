import jwt, { JsonWebTokenError } from "jsonwebtoken"
import dotenv from 'dotenv'
import { Schema } from "mongoose"

dotenv.config()

export const generateToken = async (data: any)
    : Promise<string | Error> => {
    try {
        const token = jwt.sign(
            JSON.stringify(data),
            process.env.JWT_SECRET_KEY as string,
        )

        return token
    } catch (error) {
        let msg = "Error while creating json web token"
        if (error instanceof Error) msg = error.message

        throw new JsonWebTokenError(msg, error as Error)
    }
}