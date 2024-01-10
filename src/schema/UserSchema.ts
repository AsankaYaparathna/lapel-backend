import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    fullName: z.string().min(1, { message: "Full Name must be greater than 1 character!" }),
    mobileNumber: z.string().min(10, { message: "Mobile Number must be greater than 10 characters!" }),
    email: z.string().email({ message: "Invalid email address!" }),
    password: z.string().min(6, { message: "Password must be greater than 6 characters!" }),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    fullName: z.string().min(1, { message: "Full Name must be greater than 1 character!" }),
    mobileNumber: z.string().min(10, { message: "Mobile Number must be greater than 10 characters!" }),
    email: z.string().email({ message: "Invalid email address!" }),
    password: z.string().min(6, { message: "Password must be greater than 6 characters!" }),
  }).partial(),
});
