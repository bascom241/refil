import { AppError } from "./AppError.js";
import { ErrorCode } from "./errorCodes.js";

export class ValidationError extends AppError {
  constructor(message = "Validation failed") {
    super(message, 400, ErrorCode.VALIDATION_ERROR);
  }
}
