
import { createHash } from "crypto";
import  { AES, enc,  } from "crypto-js";
import dotenv from "dotenv";
import { User } from "../model/Customer/User";
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

export const generateCustomerId = (latestUser : User) : string => {
    const nextCustomerId = latestUser ? getNextCustomerId(latestUser.customerId) : 1;
    const prefix = "LPLC";
    return `${prefix}${nextCustomerId.toString().padStart(6, "0")}`;
}

function getNextCustomerId(prevCustomerId: string): number {
    const numericPart = parseInt(prevCustomerId.replace("LPLC", ""), 10);
    return numericPart + 1;
}

