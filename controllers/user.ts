import { Response, NextFunction } from "express";
import asyncErrorHandler from "../utils/asyncErrorHandler"
import User, { IUser } from "../model/User";
import { IRequest } from "../middleware/authenticate";
import { v4 as uuidv4 } from 'uuid';
import { filterNonNullValues } from "../utils/filterNonNullValues";
import dotenv from 'dotenv'

dotenv.config()

export const updateUserDetails = asyncErrorHandler(
    async (req: IRequest, res: Response, next: NextFunction) => {
        const userId = req.userId
        const { name, email, isSubscribed, } = req.query
        let params = filterNonNullValues({
            name, email, isSubscribed
        })
        let user: IUser | null = await User.findOne({ _id: userId })
        if (user == null) return res.status(403).send({ msg: "User not found" })
        user = { ...user, ...params } as IUser
        user?.save()

        const userWithNoPass = { ...user?.toObject(), password: "" }
        res.send({ userWithNoPass }).status(200)

    })
export const getUserDetails = asyncErrorHandler(
    async (req: IRequest, res: Response, next: NextFunction) => {
        const reqUserId = req.userId
        let user: IUser | null = await User.findOne({ _id: reqUserId })
        if (user == null) return res.status(403).json("User not found")

        const userWithNoPass = { ...user?.toObject(), password: "" }
        res.send({ user: userWithNoPass }).status(200)

    })

export const updateFavAnime = asyncErrorHandler(
    async (req: IRequest, res: Response, next: NextFunction) => {
        const userId = req.userId
        const animeId = req.body.animeId as string
        const name = req.body.name as string
        const imgUrl = req.body.imgUrl as string

        const user: IUser | null = await User.findOne({ _id: userId })

        if (user == null) return res.status(403).send({ msg: "User not found" })
        const found = user.favouriteAnime.some(el => el?.animeId === animeId);
        if (!found) {
            user.favouriteAnime.push({ animeId, name, imgUrl });
            await user.save()
            return res.send({ favouriteAnime: user?.favouriteAnime }).status(200)
        }
        return res.send({ favouriteAnime: user?.favouriteAnime }).status(200)
    }
)


export const deleteFavAnime = asyncErrorHandler(
    async (req: IRequest, res: Response, next: NextFunction) => {
        const userId = req.userId
        const { animeId } = req.body

        const user: IUser | null = await User.findOne({ _id: userId })
        if (user == null) return res.status(403).send({ msg: "User not found" })
        const found = user.favouriteAnime.some(el => el?.animeId === animeId);
        if (found) {
            user.favouriteAnime = user.favouriteAnime.filter(item => item.animeId != animeId)
        } else {
            user.favouriteAnime = []
        }
        await user.save()
        return res.send({ favouriteAnime: user.favouriteAnime }).status(200)
    }
)

export const getFavAnime = asyncErrorHandler(
    async (req: IRequest, res: Response, next: NextFunction) => {
        const userId = req.userId

        const user: IUser | null = await User.findOne({ _id: userId })
        if (user != null) {
            return res.send({ favouriteAnime: user.favouriteAnime }).status(200)
        }
        return res.status(404).send({ msg: "User not found" })
    }
)

export const updateWatchList = asyncErrorHandler(
    async (req: IRequest, res: Response, next: NextFunction) => {
        const userId = req.userId
        const animeId = req.body.animeId as string
        const name = req.body.name as string
        const imgUrl = req.body.imgUrl as string
        const user: IUser | null = await User.findOne({ _id: userId })

        if (user == null) return res.status(403).send({ msg: "User not found" })
        const found = user.watchList.some(el => el?.animeId === animeId);
        if (!found) {
            user.watchList.push({ animeId, name, imgUrl });
            console.log(user)
            await user.save()
            return res.send({ watchList: user?.watchList }).status(200)
        }
        return res.send({ watchList: user?.watchList }).status(200)
    }
)

export const uploadProfileImg = asyncErrorHandler(
    async (req: IRequest, res: Response, next: NextFunction) => {
        const userId = req.userId
        const profileImg = req.body.profileImg as string
        const imgId = uuidv4()
        let imgUrl: string
        imgUrl = '' //await uploadImage(profileImg, imgId)
        let user: IUser | null = await User.findOne({ _id: userId })
        if (user == null) return res.status(403).send({ msg: "User not found" })
        if (!!profileImg)
            user = { ...user, profileImgUrl: imgUrl } as IUser

        user?.save()
        return res.send({ profileImg: imgUrl }).status(200)
    }
)

export const deleteProfileImg = asyncErrorHandler(
    async (req: IRequest, res: Response, next: NextFunction) => {
        const defaultProfileImg = process.env.defaultProfileImg as string
        const userId = req.userId
        let user: IUser | null = await User.findOneAndUpdate(
            { _id: userId },
            {
                $set: {
                    profileImg: defaultProfileImg
                }
            })
        if (user == null) return res.status(403).send({ msg: "User not found" })

        user?.save()
        res.send({ profileImg: defaultProfileImg }).status(200)
    }
)

export const deleteWatchList = asyncErrorHandler(
    async (req: IRequest, res: Response, next: NextFunction) => {
        const userId = req.userId
        const { animeId } = req.body

        const user: IUser | null = await User.findOne({ _id: userId })
        if (user == null) return res.status(403).send({ msg: "User not found" })
        const found = user.watchList.some(el => el?.animeId === animeId);
        if (found) {
            user.watchList = user.watchList.filter(item => item.animeId != animeId)
        } else {
            user.watchList = []
        }
        await user.save()
        return res.send({ watchList: user.watchList }).status(200)
    }
)

export const getWatchList = asyncErrorHandler(
    async (req: IRequest, res: Response, next: NextFunction) => {
        const userId = req.userId

        const user: IUser | null = await User.findOne({ _id: userId })
        if (user != null) {
            return res.send({ watchList: user.watchList }).status(200)
        }
        return res.status(404).send({ msg: "User not found" })
    }
)