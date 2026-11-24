import express from "express"
const router = express.Router();
import { addLocation, forgot, login, refresh, register, reset, verify, verifyReset } from "./auth.controller.js";
import { RegisterRequestSchema } from "./types/RegisterRequest.type.js";
import { validate } from "../middlewares/validate.middleware.js";
import { LoginRequestSchema } from "./types/LoginRequest.type.js";
import { VerifyTokenSchema } from "./types/VerifyTokenRequest.type.js";
import { ForgotPasswordSchema } from "./types/ForgotRequest.types.js";
import { VerifyPasswordSchema } from "./types/VerifyPasswordRequest.types.js";
import { ResetPasswordSchema } from "./types/ResetPassword.types.js";
import { AddressSchema } from "../address/types/LocationRequest.types.js";
import { validateToken } from "../middlewares/authenticate.middleware.js";
import { RefreshRequestSchema } from "./types/RefreshRequest.type.js";

router.post("/register", validate(RegisterRequestSchema), register);
router.post("/login", validate(LoginRequestSchema), login);
router.post("/refresh", validate(RefreshRequestSchema), refresh);
router.post("/verify", validate(VerifyTokenSchema), verify);
router.post("/forgot-password", validate(ForgotPasswordSchema), forgot);
router.post("/verify-reset-password", validate(VerifyPasswordSchema), verifyReset);
router.post("/reset-password", validateToken, validate(ResetPasswordSchema), reset);
router.post("/address", validateToken, validate(AddressSchema), addLocation);


export default router;