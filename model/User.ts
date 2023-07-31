import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
    email: string;
    phone: string;
    password: string;
    name: string;
    isSubscribed: boolean
}

const userSchema = new Schema<IUser>({
    name: { type: String, },
    email: { type: String },
    phone: { type: String, resquired:[true, "is require field"] },
    password: { type: String, resquired:[true, "is require field"] },
    isSubscribed: { type: Boolean, default:false },
})

const User = model<IUser>("User", userSchema)

export default User