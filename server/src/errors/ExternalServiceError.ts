import { AppError } from "./AppError.js";
import { ErrorCode } from "./errorCodes.js";

export class ExternalServiceError extends AppError {
  constructor(message = "External service error") {
    super(message, 502, ErrorCode.EXTERNAL_SERVICE_ERROR);
  }
}
