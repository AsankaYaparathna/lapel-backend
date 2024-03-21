"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.billingSchema = exports.changePasswordSchema = exports.verifyMobileSchema = exports.verifyOtpSchema = exports.loginSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z.string()
            .nonempty({ message: "Full Name is required!" })
            .min(1, { message: "Full Name must be greater than 1 character!" }),
        mobileNumber: zod_1.z.string()
            .nonempty({ message: "Mobile Number is required!" })
            .min(10, { message: "Mobile Number must be greater than 10 characters!" }),
        email: zod_1.z.string()
            .nonempty({ message: "Email Address is required!" })
            .email({ message: "Invalid Email Address!" }),
        password: zod_1.z.string()
            .nonempty({ message: "Password is required!" })
            .min(6, { message: "Password must be greater than 6 characters!" })
    }),
});
exports.updateUserSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    body: zod_1.z.object({
        fullName: zod_1.z.string().min(1, { message: "Full Name must be greater than 1 character!" }),
        mobileNumber: zod_1.z.string()
            .nonempty({ message: "Mobile Number is required!" })
            .min(10, { message: "Mobile Number must be greater than 10 characters!" }),
        email: zod_1.z.string().email({ message: "Invalid email address!" }),
        password: zod_1.z.string().min(6, { message: "Password must be greater than 6 characters!" }),
    }).partial(),
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        mobileNumber: zod_1.z.string()
            .nonempty({ message: "Mobile Number is required!" })
            .min(10, { message: "Mobile Number must be greater than 10 characters!" }),
        password: zod_1.z.string()
            .nonempty({ message: "Password is required!" })
            .min(6, { message: "Password must be greater than 6 characters!" })
    }),
});
exports.verifyOtpSchema = zod_1.z.object({
    mobileNumber: zod_1.z.string()
        .nonempty({ message: "Mobile Number is required!" })
        .min(10, { message: "Mobile Number must be greater than 10 characters!" }),
    otp: zod_1.z.string()
        .nonempty({ message: "OTP is required!" })
        .min(6, { message: "OTP must be 6 characters long!" }),
});
exports.verifyMobileSchema = zod_1.z.object({
    mobileNumber: zod_1.z.string()
        .nonempty({ message: "Mobile Number is required!" })
        .min(10, { message: "Mobile Number must be greater than 10 characters!" }),
    otp: zod_1.z.string()
        .nonempty({ message: "OTP is required!" })
        .min(6, { message: "OTP must be 6 characters long!" }),
});
exports.changePasswordSchema = zod_1.z.object({
    currentPassword: zod_1.z.string()
        .nonempty({ message: "Current Password is required!" })
        .min(6, { message: "Password must be greater than 6 characters!" }),
    newPassword: zod_1.z.string()
        .nonempty({ message: "New Password is required!" })
        .min(6, { message: "Password must be greater than 6 characters!" }),
});
exports.billingSchema = zod_1.z.object({
    billing: zod_1.z.object({
        address1: zod_1.z.string().nonempty({ message: "Address Line 1 is required!" }),
        address2: zod_1.z.string().nonempty({ message: "Address Line 2 is required!" }),
        zipCode: zod_1.z.string().nonempty({ message: "Zip Code is required!" }),
        city: zod_1.z.string().nonempty({ message: "City is required!" }),
    }),
});
