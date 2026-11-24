import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface RegisterFormData {
    phoneNumber: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
}

interface RegisterState extends RegisterFormData {
    setPhoneNumber: (phoneNumber: string) => void;
    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
    setPassword: (password: string) => void;
    setConfirmPassword: (confirmPassword: string) => void;
}

export const useRegisterStore = create<RegisterState>()(
    persist(
        (set) => ({
            phoneNumber: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
            setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
            setFirstName: (firstName) => set({ firstName }),
            setLastName: (lastName) => set({ lastName }),
            setPassword: (password) => set({ password }),
            setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
        }),
        {
            name: "register-form",
            storage: createJSONStorage(() =>
                Platform.OS === "web"
                    ? AsyncStorage
                    : {
                          getItem: SecureStore.getItemAsync,
                          setItem: SecureStore.setItemAsync,
                          removeItem: SecureStore.deleteItemAsync,
                      },
            ),
        },
    ),
);
