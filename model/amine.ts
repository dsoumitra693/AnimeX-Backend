import { Document, Schema, model } from "mongoose";

export interface IAnime extends Document {
    name: string;
    imgUrl:string;
    animeId:string;
}

const animeSchema = new Schema<IAnime>({
    name: {String, isRequired:[true, "is required field"]},
    imgUrl: {String, isRequired:[true, "is required field"]},
    animeId: {String, isRequired:[true, "is required field"]}
})

const Anime = model<IAnime>("Anime", animeSchema)

export default Anime