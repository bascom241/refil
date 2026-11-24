import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import axios from "axios";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    useWindowDimensions,
    View,
} from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { useRouter } from "expo-router";

import { BrandHeader } from "@/components/onboarding/BrandHeader";
import { WelcomeBackground } from "@/components/onboarding/WelcomeBackground";
import { getRegisterLayout } from "@/utils/responsive";
import { registerTokens } from "@/constants/register";
import { useLogin } from "@/features/auth/hooks/useAuth";
import { toast } from "@/utils/toast";
import { saveTokens } from "@/utils/tokenService";

export default function LoginScreen() {
    const { width, height } = useWindowDimensions();
    const layout = getRegisterLayout(width, height);
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { mutate, isPending } = useLogin();

    const handleLogin = () => {
        if (!phoneNumber.trim() || !password) {
            toast.error("Login failed", "Enter your phone number and password.");
            return;
        }

        mutate(
            { phoneNumber: phoneNumber.trim(), password },
            {
                onSuccess: async ({ accessToken, refreshToken, message }) => {
                    try {
                        await saveTokens({ accessToken, refreshToken });
                        toast.success(message || "Login successful");
                        router.replace("/tabs");
                    } catch {
                        toast.error("Login failed", "Your session could not be saved securely. Please try again.");
                    }
                },
                onError: (error) => {
                    const message = axios.isAxiosError<{ message?: string }>(error)
                        ? error.response?.data?.message
                        : undefined;
                    toast.error(
                        "Login failed",
                        typeof message === "string" ? message : "Check your details and try again.",
                    );
                },
            },
        );
    };

    return (
        <View className="flex-1 overflow-hidden bg-[#F6F6F6]">
            <StatusBar style="light" />
            <WelcomeBackground scale={layout.artworkScale} width={width} />
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView
                    className="flex-1"
                    contentContainerStyle={{
                        flexGrow: 1,
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: layout.topPadding,
                        paddingBottom: layout.bottomPadding,
                    }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <BrandHeader />
                    <View className="items-center" style={{ width: layout.contentWidth }}>
                        <Text
                            className="text-center text-[30px] leading-9 tracking-[1.2px] text-[#121212]"
                            style={{ fontFamily: registerTokens.fonts.regular }}
                        >
                            Login
                        </Text>

                        <View className="mt-[35px] w-full gap-[26px]">
                            <View className="w-full gap-[10px]">
                                <Text
                                    className="text-[12px] leading-[19px] tracking-[-0.24px] text-[#606060]"
                                    style={{ fontFamily: registerTokens.fonts.regular }}
                                >
                                    Phone number
                                </Text>
                                <TextInput
                                    className="h-[58px] w-full rounded-full border border-[#F8810B] bg-[#F6F6F6] px-5 text-[14px] leading-[21px] tracking-[-0.14px] text-[#1A1C1E]"
                                    style={{ fontFamily: registerTokens.fonts.regular }}
                                    accessibilityLabel="Phone number"
                                    placeholder="(+234) 9135-464-740"
                                    placeholderTextColor="#606060"
                                    keyboardType="phone-pad"
                                    autoComplete="tel"
                                    value={phoneNumber}
                                    onChangeText={setPhoneNumber}
                                />
                            </View>

                            <View className="w-full gap-[10px]">
                                <Text
                                    className="text-[12px] leading-[19px] tracking-[-0.24px] text-[#606060]"
                                    style={{ fontFamily: registerTokens.fonts.regular }}
                                >
                                    Password
                                </Text>
                                <View className="h-[58px] w-full flex-row items-center rounded-full border border-[#F8810B] bg-[#F6F6F6] px-5">
                                    <TextInput
                                        className="flex-1 text-[14px] leading-[21px] tracking-[-0.14px] text-[#1A1C1E]"
                                        style={{ fontFamily: registerTokens.fonts.regular }}
                                        accessibilityLabel="Password"
                                        placeholder="Password"
                                        placeholderTextColor="#606060"
                                        autoComplete="password"
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={!showPassword}
                                        onSubmitEditing={handleLogin}
                                        returnKeyType="go"
                                    />
                                    <Pressable
                                        accessibilityRole="button"
                                        accessibilityLabel={showPassword ? "Hide password" : "Show password"}
                                        onPress={() => setShowPassword((visible) => !visible)}
                                        hitSlop={10}
                                        className="ml-2 items-center justify-center"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={20} color="#606060" />
                                        ) : (
                                            <Eye size={20} color="#606060" />
                                        )}
                                    </Pressable>
                                </View>
                            </View>

                            <Pressable
                                accessibilityRole="button"
                                accessibilityLabel="Login"
                                accessibilityState={{ disabled: isPending }}
                                disabled={isPending}
                                onPress={handleLogin}
                                className="h-[58px] w-full items-center justify-center rounded-full border border-[#F8810B] bg-[#F8810B] px-5"
                                style={{ opacity: isPending ? 0.7 : 1 }}
                            >
                                {isPending ? (
                                    <ActivityIndicator color="#F6F6F6" />
                                ) : (
                                    <Text
                                        className="text-center text-[20px] text-[#F6F6F6]"
                                        style={{ fontFamily: registerTokens.fonts.semibold }}
                                    >
                                        Login
                                    </Text>
                                )}
                            </Pressable>
                        </View>
                    </View>
                    <View />
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}