import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    fullName: z.string()
      .nonempty({ message: "Full Name is required!" })
      .min(1, { message: "Full Name must be greater than 1 character!" }),
    mobileNumber: z.string()
      .nonempty({ message: "Mobile Number is required!" })
      .min(10, { message: "Mobile Number must be greater than 10 characters!" }),
    email: z.string()
      .nonempty({ message: "Email Address is required!" })
      .email({ message: "Invalid Email Address!" }),
    password: z.string()
    .nonempty({ message: "Password is required!" })
    .min(6, { message: "Password must be greater than 6 characters!" })
  }),
});

export const updateUserSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    fullName: z.string().min(1, { message: "Full Name must be greater than 1 character!" }),
    mobileNumber: z.string()
    .nonempty({ message: "Mobile Number is required!" })
    .min(10, { message: "Mobile Number must be greater than 10 characters!" }),
    email: z.string().email({ message: "Invalid email address!" }),
    password: z.string().min(6, { message: "Password must be greater than 6 characters!" }),
  }).partial(),
});

export const loginSchema = z.object({
  body: z.object({
    mobileNumber: z.string()
    .nonempty({ message: "Mobile Number is required!" })
    .min(10, { message: "Mobile Number must be greater than 10 characters!" }),
    password: z.string()
      .nonempty({ message: "Password is required!" })
      .min(6, { message: "Password must be greater than 6 characters!" })
  }),
});


export const verifyOtpSchema = z.object({
  mobileNumber: z.string()
    .nonempty({ message: "Mobile Number is required!" })
    .min(10, { message: "Mobile Number must be greater than 10 characters!" }),
  otp: z.string()
    .nonempty({ message: "OTP is required!" })
    .min(6, { message: "OTP must be 6 characters long!" }),
});


export const verifyMobileSchema = z.object({
  mobileNumber: z.string()
    .nonempty({ message: "Mobile Number is required!" })
    .min(10, { message: "Mobile Number must be greater than 10 characters!" }),
  otp: z.string()
    .nonempty({ message: "OTP is required!" })
    .min(6, { message: "OTP must be 6 characters long!" }),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string()
    .nonempty({ message: "Current Password is required!" })
    .min(6, { message: "Password must be greater than 6 characters!" }),
  newPassword: z.string()
    .nonempty({ message: "New Password is required!" })
    .min(6, { message: "Password must be greater than 6 characters!" }),
});

export const billingSchema = z.object({
  billing: z.object({
    address1: z.string().nonempty({ message: "Address Line 1 is required!" }),
    address2: z.string().nonempty({ message: "Address Line 2 is required!" }),
    zipCode: z.string().nonempty({ message: "Zip Code is required!" }),
    city: z.string().nonempty({ message: "City is required!" }),
  }),
});













