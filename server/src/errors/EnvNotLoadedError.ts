import { AppError } from "./AppError.js";
import type { DotenvError } from "dotenv";
import { ErrorCode } from "./errorCodes.js";



export class EnvError extends AppError {
    constructor(message="Error Loading env file"){
        super(message, 404, ErrorCode.ENV_ERROR )
    }
}