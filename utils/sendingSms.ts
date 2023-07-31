const { Vonage } = require('@vonage/server-sdk')
import dotenv from 'dotenv'

dotenv.config()
const FROM = "AnmeX"

export const createOtp = ():string => {
    let otp = (Math.ceil(Math.random() * 10e5)).toString()
    if(otp.length != 6) return createOtp() 
    console.log(otp)
    return otp
}

const vonage = new Vonage({
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET
})


export const sendSMS = async (number: string, msg: string) => {
    await vonage.sms.send({ to:number, from:FROM, text:msg })
}

export const sendOtp = async (number:string, otp:string) => {
    await sendSMS(number,
        `<#> ${otp} is your One Time Password(OTP) for your login to the AnimeX App.Please don't share this code with anyone`
        )
}