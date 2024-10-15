import { date, z } from "zod"

export const usernameValidation = z.string()
    .min(2, { message: "Username must have at least 2 characters" })
    .max(20, { message: "Username must not have more than 20 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" });

export const signupValidation = z.object({
    username: usernameValidation,
    email: z.string().email({ message: "Enter a valid email" }),
    password: z.string().min(6, { message: "Password must atleast have 6 Characters" }),
})

export const signinValidation = z.object({
    identifier: z.string().min(1,{message : "Username and email should be correct"}),
    password: z.string().min(6, { message: "Password must atleast have 6 Characters" }),
})

export const verifyCodeValidation = z.object({
    verifyCode: z.string().length(6, { message: "Verification must have 6 digits" })
})

export const acceptMessageValidation = z.object({
    isAcceptingMessages: z.boolean().default(true),
})

export const messageValidation = z.object({
    content: z.string().min(10, { message: "Message must atleast have 10 Characters" }).max(300, { message: "Message not have more than 300 Characters" })
})
