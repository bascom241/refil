import ViewIcon from '@hugeicons/core-free-icons/ViewIcon';
import ViewOffIcon from '@hugeicons/core-free-icons/ViewOffIcon';
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { AuthProgress, type AuthProgressStep } from "@/components/auth/AuthProgress";
import { registerTokens } from "@/constants/register";
import { useRegisterStore } from "@/features/auth/store/registerStore";

interface Props {
    contentWidth: number;
    currentStep: AuthProgressStep;
    onNext?: () => void;
}

const LoginActions = ({
    contentWidth,
    currentStep,
    onNext,
}: Props) => {
    const password = useRegisterStore((state) => state.password);
    const setPassword = useRegisterStore((state) => state.setPassword);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View
            className="items-center"
            style={{
                width: contentWidth,
            }}
        >
            <Text
                className="text-center text-[30px] leading-9 tracking-[1.2px] text-[#121212]"
                style={{ fontFamily: registerTokens.fonts.regular }}
            >
                Add Password
            </Text>

            <View className="mt-[35px] w-full gap-[26px]">
                <View className="w-full gap-[10px]">
                    <Text
                        className="text-[12px] leading-[19px] tracking-[-0.24px] text-[#606060]"
                        style={{ fontFamily: registerTokens.fonts.regular }}
                    >
                        Password
                    </Text>

                    {/* Input Container with Eye Icon */}
                    <View className="h-[58px] w-full flex-row items-center rounded-full border border-[#F8810B] bg-[#F6F6F6] px-5">
                        <TextInput
                            className="flex-1 text-[14px] leading-[21px] tracking-[-0.14px] text-[#1A1C1E]"
                            style={{ fontFamily: registerTokens.fonts.regular }}
                            accessibilityLabel="Password"
                            placeholder="*******"
                            placeholderTextColor="#1A1C1E"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                        />

                        <Pressable
                            onPress={() => setShowPassword((prev) => !prev)}
                            hitSlop={10}
                            className="ml-2 items-center justify-center"
                        >
                            {showPassword ? (
                                <HugeiconsIcon icon={ViewOffIcon} size={20} color="#606060" />
                            ) : (
                                <HugeiconsIcon icon={ViewIcon} size={20} color="#606060" />
                            )}
                        </Pressable>
                    </View>
                </View>

                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Next"
                    onPress={onNext}
                    className="h-[58px] w-full items-center justify-center rounded-full border border-[#F8810B] bg-[#F8810B] px-5"
                    style={{
                        shadowColor: "#CBD6FF",
                        shadowOpacity: 0.05,
                        shadowRadius: 10,
                        shadowOffset: {
                            width: 0,
                            height: 10,
                        },
                        elevation: 1,
                    }}
                >
                    <Text
                        className="text-center text-[20px] text-[#F6F6F6]"
                        style={{
                            fontFamily: registerTokens.fonts.semibold,
                        }}
                    >
                        Next
                    </Text>
                </Pressable>
            </View>

            <AuthProgress currentStep={currentStep} />
        </View>
    );
};

export default LoginActions;