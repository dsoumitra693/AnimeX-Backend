import express from 'express'
import { generateOtp, verifyOtp } from "../controllers/auth"

const authRouter = express.Router()

authRouter.post('/otp/generate', generateOtp)
authRouter.post('/otp/verify',verifyOtp)
// authRouter.delete('user/logout', logoutUser)

export default authRouter