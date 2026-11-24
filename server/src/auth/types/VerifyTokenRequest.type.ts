import {z} from "zod"

export const VerifyTokenSchema = z.object({
    token: z.string().min(4, "Invalid Token sent")
})


export type  VerifyTokenRequest  = z.infer<typeof VerifyTokenSchema>