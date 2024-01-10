
import { createHash } from "crypto";
import  { AES, enc,  } from "crypto-js";
import dotenv from "dotenv";
const crypto = require("crypto");

dotenv.config();

const appDataHashSecret = process.env.APP_DATA_HASH_SECRET || "";

export const hashPassword = (password: string): string => {
    const hash = createHash('sha256');
    hash.update(password + appDataHashSecret);
    const pw = hash.digest('hex');
    return pw
};

export const verifyPassword = (storedHashedPassword: string, providedPassword: string): boolean => {
    const hashedProvidedPassword = hashPassword(hashPassword(providedPassword));
    return storedHashedPassword === hashedProvidedPassword;
};

export const generateOTP = ():number=>{
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
}

export const generateSecret = () => {
    return crypto.randomBytes(32).toString("hex");
};

export const generateId = () => {
    return crypto.randomBytes(16).toString("hex");
};

