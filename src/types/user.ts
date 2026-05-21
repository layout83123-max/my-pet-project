import { email, z }from "zod"

export const userSchema = z.object({
    name: z.string()
    .min(3, "Name is too short")
    .max(15, "Name is too long"),

    email: z.string()
    .email("Invalid email format"),

    password: z.string()
    .min(6, "The minimum number of characters for a password is 6")
    .max(18, "The password must be a maximum of 18 characters")

 
})


export const loginSchema = z.object({
    email: z.string()
    .email("Invalid email format"),

     password: z.string()
    .min(6, "The minimum number of characters for a password is 6")
    .max(18, "The password must be a maximum of 18 characters.")
})


export const changePassSchema = z.object({
    password: z.string()
    .min(6, "The minimum number of characters for a password is 6")
    .max(18, "The password must be a maximum of 18 characters."),

    newPassword: z.string()
    .min(6, "The minimum number of characters for a password is 6")
    .max(18, "The password must be a maximum of 18 characters."),
})

export const emailSchema = z.object({
    email: z.string()
    .email("Invalid email format")
})


export type User = z.infer<typeof userSchema>

