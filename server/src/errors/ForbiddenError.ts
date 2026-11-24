import { AppError } from "./AppError.js";
import { ErrorCode } from "./errorCodes.js";

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403, ErrorCode.FORBIDDEN);
  }
}
