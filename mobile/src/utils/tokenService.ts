import * as SecureStore from "expo-secure-store";

const ACCESS_KEY = "access_token";
const REFRESH_KEY = "refresh_token";

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export const saveTokens = async ({ accessToken, refreshToken }: TokenPair) => {
  await SecureStore.setItemAsync(REFRESH_KEY, refreshToken);
  await SecureStore.setItemAsync(ACCESS_KEY, accessToken);
};

export const getAccessToken = () => SecureStore.getItemAsync(ACCESS_KEY);

export const getRefreshToken = () => SecureStore.getItemAsync(REFRESH_KEY);

export const clearTokens = async () => {
  await SecureStore.deleteItemAsync(ACCESS_KEY);
  await SecureStore.deleteItemAsync(REFRESH_KEY);
};
