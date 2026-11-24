
import type { TokenPayload } from "../src/auth/types/TokenPayload.js";
import type { RefreshTokenPayload } from "../src/auth/types/RefreshTokenPayload.js";
import { createHash } from "node:crypto";
import jwt from "jsonwebtoken"

export const generateToken = (payload: TokenPayload) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined")
    }
    return jwt.sign({ ...payload, tokenUse: "access" }, secret, { expiresIn: "15m" });
}


export const generateRefreshToken = (payload: RefreshTokenPayload) => {
    const secret = process.env.REFRESH_TOKEN_SECRET;
    if (!secret) {
        throw new Error("REFRESH_TOKEN is not defined")
    }
    return jwt.sign({ ...payload, tokenUse: "refresh" }, secret, { expiresIn: "3d" })
}

export const hashRefreshToken = (token: string) =>
    createHash("sha256").update(token).digest("hex");
