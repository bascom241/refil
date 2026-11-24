import {z} from "zod"


export const ResetPasswordSchema = z.object({
      newPassword: z.string().min(8, "Password must be atleast 8 characters long")
})


export type ResetPasswordRequestDto = z.infer<typeof ResetPasswordSchema>