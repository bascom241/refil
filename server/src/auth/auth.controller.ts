import type { Request, Response, NextFunction } from "express"
import type { RegisterRequestDto } from "./types/RegisterRequest.type.js";
import { addAddress, forgotPassword, loginUser, refreshUserTokens, registerUser, verifyResetPassowrd, verifyToken } from "./auth.service.js";
import type { VerifyTokenRequest } from "./types/VerifyTokenRequest.type.js";
import type { LoginRequestDto } from "./types/LoginRequest.type.js";
import type { AddressDto } from "../address/types/LocationRequest.types.js";
import type { ValidateRequestType } from "../middlewares/authenticate.middleware.js";
import type { ForgotPasswordRequest } from "./types/ForgotRequest.types.js";
import type { VerifyPasswordRequestDto } from "./types/VerifyPasswordRequest.types.js";
import type { ResetPasswordRequestDto } from "./types/ResetPassword.types.js";
import { resetPassword } from "./auth.service.js";
import type { RefreshRequestDto } from "./types/RefreshRequest.type.js";


export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataToSend: RegisterRequestDto = req.body;
        const data = await registerUser(dataToSend);
        res.status(201).json({success: true, data, message:"user created succesfully"})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const verify = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const dataToSend:VerifyTokenRequest = req.body; 
        const data = await verifyToken(dataToSend); 
        res.status(200).json({success: true, data, message: "user verified successfully"})
    }catch(error){
        next(error)
    }

}
export const login = async (req: Request, res:Response, next: NextFunction) => {
    try{
        const dataToSend: LoginRequestDto = req.body; 
        const data  = await loginUser(dataToSend); 
        res.status(200).json({success: true,  data, message:"Login successfully"})
    }catch(error){
        next(error)
    }
}

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataToSend: RefreshRequestDto = req.body;
        const data = await refreshUserTokens(dataToSend);
        res.status(200).json({ success: true, data, message: "Session refreshed successfully" });
    } catch (error) {
        next(error);
    }
}

export const addLocation = async (req: ValidateRequestType, res: Response, next:NextFunction) => {
    try {

        const userId = (req.user as {id: string }).id
        const dataToSend: AddressDto = req.body; 
        const data = await addAddress(userId, dataToSend); 
        res.status(201).json({success: true, data, message:"Address created successfully"})
    } catch (error) {
        next(error)
    }
}

export const forgot  = async (req: Request, res: Response, next: NextFunction) => {
    try{    
        const dataToSend: ForgotPasswordRequest = req.body; 
        const data = await forgotPassword(dataToSend);
        res.status(200).json({success: true, data, message:"message sent successfully"})
    }catch(error){
        next(error)
    }
}

export const verifyReset = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataToSend: VerifyPasswordRequestDto = req.body; 
        const data = await verifyResetPassowrd(dataToSend); 
        res.status(200).json({success: true, data , message:"Reset password verified successfully"})
    } catch (error) {
        next(error)
    }
}

export const reset = async (req: ValidateRequestType, res: Response, next:NextFunction) => {
    try {
        const userId = (req.user as {id:string}).id
        const dataToSend: ResetPasswordRequestDto = req.body; 
        const data = await resetPassword(userId, dataToSend);
        res.status(200).json({success: true, data, message:"Password reset successfully"})
    } catch (error) {
        next(error)
    }
}
