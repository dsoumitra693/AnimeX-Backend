export declare const createOtp: () => string;
export declare const sendSMS: (number: string, msg: string) => Promise<void>;
export declare const sendOtp: (number: string, otp: string) => Promise<void>;
