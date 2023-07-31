import express from 'express'
import { updateUserDetails } from '../controllers/user'

const userRouter = express.Router()

userRouter.put('/update', updateUserDetails)
 
export default userRouter