import { AppError } from "./AppError.js";
import { ErrorCode } from "./errorCodes.js";

export class UnAuthenticatedError extends AppError {
  constructor(message = "Unauthenticated access", code = ErrorCode.UNAUTHORIZED) {
    super(message, 401, code);
  }
}