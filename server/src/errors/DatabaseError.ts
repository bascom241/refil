import { AppError } from "./AppError.js";
import { ErrorCode } from "./errorCodes.js";

export class DatabaseError extends AppError {
  constructor(message = "Error connecting to Database") {
    super(message, 500, ErrorCode.DATABASE_ERROR);
  }
}
