import {z} from  "zod"

export const LoginRequestSchema = z.object({
    phoneNumber: z.string().min(11,"Phone number is invalid"), 
    password: z.string().min(8, "Password must be atleast 8 characters long")
})


export type LoginRequestDto = z.infer<typeof LoginRequestSchema>