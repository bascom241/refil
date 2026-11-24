import { AppError } from "./AppError.js";
import { ErrorCode } from "./errorCodes.js";


export class UserNotFoundError extends AppError{
    constructor(message = "User already does not exist") {
    super(message, 409, ErrorCode.USER_NOT_FOUND);
  }
}