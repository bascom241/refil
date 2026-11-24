import axios from "axios"
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  saveTokens,
  type TokenPair,
} from "@/utils/tokenService";

const API_BASE_URL = "http://192.168.100.12:5000/api/v1";
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const publicEndPoints = ["/auth/login", "/auth/register", "/auth/verify", "/auth/refresh"];
let refreshInFlight: Promise<string> | null = null;
let onAuthExpired: (() => void) | undefined;

interface ApiEnvelope<T> {
  data: T;
}

export const setAuthExpiredHandler = (handler: (() => void) | undefined) => {
  onAuthExpired = handler;
};

apiClient.interceptors.request.use(
  async (config) => {
    const isPublicEndPoint = publicEndPoints.some((url) =>
      config.url?.includes(url),
    );
    if (!isPublicEndPoint) {
      const token = await getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const refreshAccessToken = async () => {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) {
    throw new Error("No refresh token is available");
  }

  try {
    const response = await axios.post<ApiEnvelope<TokenPair>>(
      `${API_BASE_URL}/auth/refresh`,
      { refreshToken },
      { timeout: 10000, headers: { "Content-Type": "application/json" } },
    );
    const tokens = response.data.data;
    if (!tokens?.accessToken || !tokens.refreshToken) {
      throw new Error("The refresh endpoint returned an invalid token response");
    }

    await saveTokens(tokens);
    return tokens.accessToken;
  } catch (error) {
    const status = axios.isAxiosError(error) ? error.response?.status : undefined;
    if (status === 400 || status === 401) {
      await clearTokens();
    }
    throw error;
  }
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;
    const isPublicEndPoint = publicEndPoints.some((url) =>
      originalRequest?.url?.includes(url),
    );

    if (error.response?.status !== 401 || !originalRequest || originalRequest._retry || isPublicEndPoint) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    try {
      refreshInFlight ??= refreshAccessToken().finally(() => {
        refreshInFlight = null;
      });
      const accessToken = await refreshInFlight;
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return await apiClient(originalRequest);
    } catch (refreshError) {
      if (axios.isAxiosError(refreshError) && [400, 401].includes(refreshError.response?.status ?? 0)) {
        await clearTokens();
        onAuthExpired?.();
      }
      return Promise.reject(refreshError);
    }
  },
);