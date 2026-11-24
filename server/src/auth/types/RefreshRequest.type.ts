import { z } from "zod";

export const RefreshRequestSchema = z.object({
    refreshToken: z.string().min(1, "Refresh token is required"),
});

export type RefreshRequestDto = z.infer<typeof RefreshRequestSchema>;
