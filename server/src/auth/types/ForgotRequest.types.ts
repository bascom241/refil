import {z} from "zod"


export const ForgotPasswordSchema = z.object({
    phoneNumber: z.string().min(11, "Invalid Phone Number")
})


export type ForgotPasswordRequest = z.infer<typeof ForgotPasswordSchema>