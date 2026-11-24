import { AppError } from "./AppError.js";
import { ErrorCode } from "./errorCodes.js";

export class EmailAlreadyExistsError extends AppError {
  constructor(message = "Email already exists") {
    super(message, 409, ErrorCode.EMAIL_ALREADY_EXISTS);
  }
}
