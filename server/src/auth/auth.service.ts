
import { randomInt } from "node:crypto";
import userModel from "../auth/auth.model.js"
import type { RegisterRequestDto } from "./types/RegisterRequest.type.js";
import { UserExistsError } from "../errors/UserExitsError.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/generateToken.js";
import type { RegisterResponse } from "./types/RegisterResponse.js";
import { createAddress } from "../address/address.service.js";
import { sendVerificationSms, sendResetPassord } from "../services/brevoSms.service.js";
import type { LoginRequestDto } from "./types/LoginRequest.type.js";
import type { LoginResponse } from "./types/LoginResponse.js";
import { UserNotFoundError } from "../errors/UserNotFoundError.js";
import { InvalidCredentialsError } from "../errors/UnAuthorizedError.js";
import type { VerifyTokenRequest } from "./types/VerifyTokenRequest.type.js";
import type { AddressDto } from "../address/types/LocationRequest.types.js";
import type { ForgotPasswordRequest } from "./types/ForgotRequest.types.js";
import type{ VerifyPasswordRequestDto } from "./types/VerifyPasswordRequest.types.js";
import type { ResetPasswordRequestDto } from "./types/ResetPassword.types.js";
import authSessionModel from "./authSession.model.js";
import { generateRefreshToken, hashRefreshToken } from "../../utils/generateToken.js";
import type { RefreshRequestDto } from "./types/RefreshRequest.type.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const REFRESH_TOKEN_TTL_MS = 3 * 24 * 60 * 60 * 1000;

const createTokenPair = (user: { _id: mongoose.Types.ObjectId; phoneNumber: string }, sessionId: string) => {
    const accessToken = generateToken({
        id: user._id.toString(),
        phoneNumber: user.phoneNumber,
    });
    const refreshToken = generateRefreshToken({ id: user._id.toString(), sessionId });

    return { accessToken, refreshToken };
};

const issueTokenPair = async (user: { _id: mongoose.Types.ObjectId; phoneNumber: string }) => {
    const sessionId = new mongoose.Types.ObjectId().toString();
    const tokens = createTokenPair(user, sessionId);

    await authSessionModel.create({
        _id: sessionId,
        userId: user._id,
        refreshTokenHash: hashRefreshToken(tokens.refreshToken),
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
    });

    return tokens;
};

export const registerUser = async (data: RegisterRequestDto): Promise<RegisterResponse> => {
    const { phoneNumber, firstName, lastName, password, role } = data;

    const user = await userModel.findOne({ phoneNumber });
    if (user) {
        throw new UserExistsError()
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const verificationToken = randomInt(1000, 10_000).toString();
    const verificationTokenExpiresAt = Date.now() + 10 * 60 * 1000;

    // await sendVerificationSms(phoneNumber, verificationToken);  To be Implemented


    const newUser = await userModel.create({
        phoneNumber,
        firstName,
        lastName,
        password: hashPassword,
        ...(role !== undefined ? { role } : {}),
        verificationToken,
        verificationTokenExpiresAt,
    })

    const tokens = await issueTokenPair(newUser);


    return {
        phoneNumber: newUser.phoneNumber,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        ...tokens,
        token:newUser.verificationToken ?? ""

    }
}


// 1 
export const verifyToken = async (data: VerifyTokenRequest) => {
    const { token } = data;

    const user = await userModel.findOne({ verificationToken: token });

    if (!user) {
        throw new InvalidCredentialsError("Invalid verification token sent");
    }

    if (!user.verificationTokenExpiresAt || user.verificationTokenExpiresAt.getTime() <= Date.now()) {
        throw new InvalidCredentialsError("Verifcation token has Expired")
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiresAt = null;

    await user.save();

}

// 2
export const loginUser = async (data: LoginRequestDto): Promise<LoginResponse> => {
    const { phoneNumber, password } = data
    const user = await userModel.findOne({ phoneNumber });

    if (!user) {
        throw new UserNotFoundError()
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
        throw new InvalidCredentialsError()
    }

    const tokens = await issueTokenPair(user);

    return {
        ...tokens
    }

}

export const refreshUserTokens = async (data: RefreshRequestDto) => {
    const secret = process.env.REFRESH_TOKEN_SECRET;
    if (!secret) {
        throw new Error("REFRESH_TOKEN_SECRET is not defined");
    }

    let decoded: jwt.JwtPayload;
    try {
        const verified = jwt.verify(data.refreshToken, secret);
        if (typeof verified === "string") {
            throw new Error("Invalid refresh token payload");
        }
        decoded = verified;
    } catch {
        throw new InvalidCredentialsError("Refresh token is invalid or expired");
    }

    if (
        decoded.tokenUse !== "refresh" ||
        typeof decoded.id !== "string" ||
        typeof decoded.sessionId !== "string"
    ) {
        throw new InvalidCredentialsError("Refresh token is invalid or expired");
    }

    const user = await userModel.findById(decoded.id);
    if (!user) {
        throw new InvalidCredentialsError("Refresh token is invalid or expired");
    }

    const nextTokens = createTokenPair(user, decoded.sessionId);
    const currentSession = await authSessionModel.findOneAndUpdate(
        {
            _id: decoded.sessionId,
            userId: user._id,
            refreshTokenHash: hashRefreshToken(data.refreshToken),
            expiresAt: { $gt: new Date() },
        },
        {
            $set: {
                refreshTokenHash: hashRefreshToken(nextTokens.refreshToken),
                expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
            },
        },
        { new: true },
    );

    if (!currentSession) {
        throw new InvalidCredentialsError("Refresh token is invalid or expired");
    }

    return nextTokens;
};

// 3 
export const addAddress = async (userId: string, data: AddressDto) => {
    const user = await userModel.findById(userId);
    if (!user) {
        throw new UserNotFoundError();
    }
    await createAddress(data, userId);
}

// 4
export const forgotPassword = async (data: ForgotPasswordRequest) => {
    const { phoneNumber } = data;

    const user = await userModel.findOne({ phoneNumber });

    if (!user) {
        throw new UserNotFoundError()
    }

    const resetPasswordToken = randomInt(1000, 10_000).toString();
    const resetPasswordExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    user.resetPasswordToken = resetPasswordToken; 
    user.resetPasswordTokenExpiresAt = resetPasswordExpiresAt;


    await user.save(); 

    // await sendResetPassord(phoneNumber, resetPasswordToken) to be implemneted later

}

// 5
export const verifyResetPassowrd = async (data: VerifyPasswordRequestDto) => {
    const {token} = data; 

    const user = await userModel.findOne({resetPasswordToken: token});

    if(!user){
        throw new InvalidCredentialsError("invalid token sent")
    }; 


    if(!user.resetPasswordTokenExpiresAt || user.resetPasswordTokenExpiresAt.getTime() <= Date.now()){
        throw new InvalidCredentialsError("Reset Password token Expired")
    }

    
    user.resetPasswordToken = null; 
    user.resetPasswordTokenExpiresAt = null; 

    await user.save();
}

// 6
export const resetPassword = async (userId: string , data: ResetPasswordRequestDto) => {
    const {newPassword} = data;

    const user = await userModel.findById(userId); 
    if(!user){
        throw new UserNotFoundError(); 
    }
    const hashPassoword = await bcrypt.hash(newPassword, 12); 

    user.password=hashPassoword; 
    await user.save();

}




