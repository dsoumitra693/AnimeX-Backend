import mongoose from "mongoose"
import dotenv from "dotenv"
import createHttpError from 'http-errors'

dotenv.config()

const connectToDB = async () => {
    try {
        const uri = process.env.MONGODB_URI as string
        await mongoose.connect(uri);
        console.log("connected to mongodb")
    } catch (error) {
        throw createHttpError(500, error as string)
    }

}

export default connectToDB