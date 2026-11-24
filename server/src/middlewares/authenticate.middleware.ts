import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

import { UnAuthenticatedError } from "../errors/UnAuthenticatedError.js";
export type ValidateRequestType = Request & {
    user?: string | JwtPayload;
};

export const validateToken = (
    req: ValidateRequestType,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
        throw new UnAuthenticatedError();
    }

    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
        throw new Error("JWT_SECRET is not defined.");
    }

    try {
        const decodedToken = jwt.verify(token, secretKey);
        if (typeof decodedToken === "string" || decodedToken.tokenUse !== "access") {
            throw new UnAuthenticatedError();
        }
        req.user = decodedToken as any;
        next();
    } catch (err) {
        console.error(err);
        throw new UnAuthenticatedError();
    }
};