import bcrypt from 'bcrypt';

const SALT_ROUND = 10
export const encOtp = async (otp: string)
    : Promise<string | Error> => {
    try {
        const hash = bcrypt.hash(otp, SALT_ROUND)
        return hash
    } catch (error) {
        let msg = "encription failed"
        if (error instanceof Error) msg = error.message
        throw new Error(msg)
    }
}

export const compareOtp = async (userOtp: string, hashedOtp: string)
    : Promise<boolean | Error> => {
    try {
        const isMatch = await bcrypt.compare(userOtp, hashedOtp);
        return isMatch
    } catch (error) {
        console.error('Otp comparison error:', error);
        let message = 'Otp comparison error';
        if (error instanceof Error) message = error.message;
        throw new Error(message);
    }
}