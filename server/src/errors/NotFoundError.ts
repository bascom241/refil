import { AppError } from "./AppError.js";
import { ErrorCode } from "./errorCodes.js";

export class NotFoundError extends AppError {
  constructor(message = "Resource not found", code = ErrorCode.RESOURCE_NOT_FOUND) {
    super(message, 404, code);
  }
}

export class ResourceNotFoundError extends NotFoundError {
  constructor(message = "Resource not found") {
    super(message, ErrorCode.RESOURCE_NOT_FOUND);
  }
}

export class UserNotFoundError extends AppError {
  constructor(message = "User not found") {
    super(message, 404, ErrorCode.USER_NOT_FOUND);
  }
}