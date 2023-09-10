import express from 'express'
import {
    deleteFavAnime,
    deleteWatchList,
    getFavAnime,
    getUserDetails,
    getWatchList,
    updateFavAnime,
    updateUserDetails,
    updateWatchList
} from '../controllers/user'

const userRouter = express.Router()

userRouter.get('/', getUserDetails)
userRouter.put('/update', updateUserDetails)
userRouter.put('/fav-anime', updateFavAnime)
userRouter.get('/fav-anime', getFavAnime)
userRouter.delete('/fav-anime', deleteFavAnime)

userRouter.put('/watch-list', updateWatchList)
userRouter.get('/watch-list', getWatchList)
userRouter.delete('/watch-list', deleteWatchList)


export default userRouter