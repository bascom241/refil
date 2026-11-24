import { AppError } from "./AppError.js";
import { ErrorCode } from "./errorCodes.js";

export class InternalServerError extends AppError {
  constructor(message = "Internal server error") {
    super(message, 500, ErrorCode.INTERNAL_ERROR);
  }
}
