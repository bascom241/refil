import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";



export const errorMiddleWare = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(err)


    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false, error: {
                code: err.code,
                message: err.message
            }
        })
    }

    return res.status(500).json({
        success: false, error: {
            code: 500,
            message: "Internal Server Error"
        }
    })
}