import {z} from "zod"



export const VerifyPasswordSchema  = z.object({
    token: z.string().min(4, "Invalid reset token sent")
})


export type VerifyPasswordRequestDto = z.infer<typeof VerifyPasswordSchema>
