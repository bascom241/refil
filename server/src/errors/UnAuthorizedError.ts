import { AppError } from "./AppError.js";
import { ErrorCode } from "./errorCodes.js";

export class UnAuthorizedError extends AppError {
  constructor(message = "Unauthorized request access", code = ErrorCode.UNAUTHORIZED) {
    super(message, 401, code);
  }
}

export class UnauthorizedError extends UnAuthorizedError {}

export class InvalidCredentialsError extends AppError {
  constructor(message = "Invalid credentials") {
    super(message, 401, ErrorCode.INVALID_CREDENTIALS);
  }
}