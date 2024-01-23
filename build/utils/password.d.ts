export declare const encOtp: (otp: string) => Promise<string | Error>;
export declare const compareOtp: (userOtp: string, hashedOtp: string) => Promise<boolean | Error>;
