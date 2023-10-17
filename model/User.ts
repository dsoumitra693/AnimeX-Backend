import { Document, Schema, model } from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
export interface IUser extends Document {
    email: string;
    phone: string;
    password: string;
    name: string;
    profileImgUrl: string;
    isSubscribed: boolean;
    favouriteAnime: Array<IAnime>;
    watchList: Array<IAnime>;
}

export interface IAnime {
    name: string;
    animeId: string;
    imgUrl: string;

}

const userSchema = new Schema<IUser>({
    name: { type: String, },
    email: { type: String },
    phone: { type: String, resquired: [true, "is require field"] },
    password: { type: String, resquired: [true, "is require field"] },
    isSubscribed: { type: Boolean, default: false },
    profileImgUrl: { type: String, default: process.env.defaultProfileImg },
    favouriteAnime: [{
        name: String,
        animeId: String,
        imgUrl: String,
    }],
    watchList: [{
        name: String,
        animeId: String,
        imgUrl: String,
    }]
})

const User = model<IUser>("User", userSchema)

export default User