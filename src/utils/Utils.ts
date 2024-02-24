
import { createHash } from "crypto";
import  { AES, enc,  } from "crypto-js";
import dotenv from "dotenv";
import { User } from "../model/Customer/User";
import { OrderInvoice } from "../model/Cart/OrderInvoice";
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

export const generateInvoiceNo = (latestUser : OrderInvoice) : string => {
    const nextCustomerId = latestUser ? getNextInvoiceId(latestUser.invoiceNo) : 1;
    const prefix = "INV";
    return `${prefix}${nextCustomerId.toString().padStart(6, "0")}`;
}

function getNextCustomerId(prevCustomerId: string): number {
    const numericPart = parseInt(prevCustomerId.replace("LPLC", ""), 10);
    return numericPart + 1;
}

function getNextInvoiceId(prevCustomerId: string): number {
    const numericPart = parseInt(prevCustomerId.replace("INV", ""), 10);
    return numericPart + 1;
}

export function generateTempPassword(length: number): string {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }
    
    return password;
}

export function LogC(msg : any){
    console.log(`\n********* ${new Date()} ***************`);
    console.log(msg);
    console.log("***********************");
}
