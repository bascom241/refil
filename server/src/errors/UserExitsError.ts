import { AppError } from "./AppError.js";
import { ErrorCode } from "./errorCodes.js";

export class UserExitsError extends AppError {
  constructor(message = "User already exists") {
    super(message, 409, ErrorCode.PHONE_NUMBER_EXISTS);
  }
}

export class UserExistsError extends UserExitsError {}
