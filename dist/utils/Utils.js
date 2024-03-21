"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogC = exports.generateTempPassword = exports.generateInvoiceNo = exports.generateCustomerId = exports.generateId = exports.generateSecret = exports.generateOTP = exports.verifyPassword = exports.hashPassword = void 0;
const crypto_1 = require("crypto");
const dotenv_1 = __importDefault(require("dotenv"));
const crypto = require("crypto");
dotenv_1.default.config();
const appDataHashSecret = process.env.APP_DATA_HASH_SECRET || "";
const hashPassword = (password) => {
    const hash = (0, crypto_1.createHash)('sha256');
    hash.update(password + appDataHashSecret);
    const pw = hash.digest('hex');
    return pw;
};
exports.hashPassword = hashPassword;
const verifyPassword = (storedHashedPassword, providedPassword) => {
    const hashedProvidedPassword = (0, exports.hashPassword)((0, exports.hashPassword)(providedPassword));
    return storedHashedPassword === hashedProvidedPassword;
};
exports.verifyPassword = verifyPassword;
const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
};
exports.generateOTP = generateOTP;
const generateSecret = () => {
    return crypto.randomBytes(32).toString("hex");
};
exports.generateSecret = generateSecret;
const generateId = () => {
    return crypto.randomBytes(16).toString("hex");
};
exports.generateId = generateId;
const generateCustomerId = (latestUser) => {
    const nextCustomerId = latestUser ? getNextCustomerId(latestUser.customerId) : 1;
    const prefix = "LPLC";
    return `${prefix}${nextCustomerId.toString().padStart(6, "0")}`;
};
exports.generateCustomerId = generateCustomerId;
const generateInvoiceNo = (latestUser) => {
    const nextCustomerId = latestUser ? getNextInvoiceId(latestUser.invoiceNo) : 1;
    const prefix = "INV";
    return `${prefix}${nextCustomerId.toString().padStart(6, "0")}`;
};
exports.generateInvoiceNo = generateInvoiceNo;
function getNextCustomerId(prevCustomerId) {
    const numericPart = parseInt(prevCustomerId.replace("LPLC", ""), 10);
    return numericPart + 1;
}
function getNextInvoiceId(prevCustomerId) {
    const numericPart = parseInt(prevCustomerId.replace("INV", ""), 10);
    return numericPart + 1;
}
function generateTempPassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }
    return password;
}
exports.generateTempPassword = generateTempPassword;
function LogC(msg) {
    console.log(`\n********* ${new Date()} ***************`);
    console.log(msg);
    console.log("***********************");
}
exports.LogC = LogC;
