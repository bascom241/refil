import axios from "axios";
import { apiClient } from "@/base/axiosInstance";
import {
    clearTokens,
    getAccessToken,
    getRefreshToken,
    saveTokens,
    type TokenPair,
} from "@/utils/tokenService";
import { RegisterRequestDto } from "../types/Register";
import { VerifyToken } from "../types/VerifyToken";

interface ApiEnvelope<T> {
    data: T;
    message: string;
}

export interface LoginRequestDto {
    phoneNumber: string;
    password: string;
}

export interface AuthResponseDto extends TokenPair {
    message: string;
}

export const login = async (data: LoginRequestDto): Promise<AuthResponseDto> => {
    const response = await apiClient.post<ApiEnvelope<TokenPair>>("/auth/login", data);
    return { ...response.data.data, message: response.data.message };
}

export const register = async (data: RegisterRequestDto) => {
    const response = await apiClient.post<ApiEnvelope<TokenPair & { token: string }>>("/auth/register", data);
    return { ...response.data.data, message: response.data.message };
}

export const verifyToken = async (data:VerifyToken) => {
    const response = await apiClient.post("/auth/verify", data)
    return response.data;
}

export const restoreSession = async () => {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
        return false;
    }

    try {
        const response = await apiClient.post<ApiEnvelope<TokenPair>>("/auth/refresh", { refreshToken });
        await saveTokens(response.data.data);
        return true;
    } catch (error) {
        const status = axios.isAxiosError(error) ? error.response?.status : undefined;
        if (status === 400 || status === 401) {
            await clearTokens();
            return false;
        }

        return Boolean(await getAccessToken());
    }
}