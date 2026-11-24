import { AppError } from "./AppError.js";
import { ErrorCode } from "./errorCodes.js";

export class RateLimitExceededError extends AppError {
  constructor(message = "Rate limit exceeded") {
    super(message, 429, ErrorCode.RATE_LIMIT_EXCEEDED);
  }
}
