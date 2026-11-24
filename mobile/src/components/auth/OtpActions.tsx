import { useRef, useState } from "react";
import { NativeSyntheticEvent, Pressable, Text, TextInput, TextInputKeyPressEventData, View } from "react-native";

import { AuthProgress, type AuthProgressStep } from "@/components/auth/AuthProgress";
import { registerTokens } from "@/constants/register";

interface Props {
    contentWidth: number;
    currentStep: AuthProgressStep;
    onNext?: (otp?: string) => void;
}

const OTP_LENGTH = 4;

const OtpActions = ({ contentWidth, currentStep, onNext }: Props) => {
    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
    const inputRefs = useRef<Array<TextInput | null>>([]);

    const handleChangeText = (text: string, index: number) => {
        // Handle pasting a full code
        if (text.length > 1) {
            const pastedOtp = text.slice(0, OTP_LENGTH).split("");
            const newOtp = [...otp];
            pastedOtp.forEach((char, i) => {
                newOtp[i] = char;
            });
            setOtp(newOtp);
            inputRefs.current[Math.min(pastedOtp.length, OTP_LENGTH - 1)]?.focus();
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Move to next input automatically
        if (text !== "" && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (
        e: NativeSyntheticEvent<TextInputKeyPressEventData>,
        index: number
    ) => {
        // Move to previous input on backspace if current field is empty
        if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    

    

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
                  Enter Four Digit Code
            </Text>

            <View className="mt-[35px] w-full gap-[26px]">
                {/* OTP Input Section */}
                <View className="w-full gap-[10px]">
                    <Text
                        className="text-[12px] leading-[19px] tracking-[-0.24px] text-[#606060]"
                        style={{ fontFamily: registerTokens.fonts.regular }}
                    >
                     Resend code 
                    </Text>

                    <View className="flex-row items-center justify-between w-full">
                        {otp.map((digit, index) => {
                            const isFilled = digit.length > 0;
                            return (
                                <TextInput
                                    key={index}
                                    ref={(ref) => {
                                        inputRefs.current[index] = ref;
                                    }}
                                    className={`h-[64px] w-[64px] rounded-full border text-center text-[20px] text-[#1A1C1E] bg-[#F6F6F6] ${isFilled ? "border-[#F8810B]" : "border-[#E0E0E0]"
                                        }`}
                                    style={{ fontFamily: registerTokens.fonts.semibold }}
                                    keyboardType="number-pad"
                                    maxLength={index === 0 ? OTP_LENGTH : 1}
                                    value={digit}
                                    onChangeText={(text) => handleChangeText(text, index)}
                                    onKeyPress={(e) => handleKeyPress(e, index)}
                                    selectTextOnFocus
                                />
                            );
                        })}
                    </View>
                </View>

                {/* Action Button */}
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Next"
                    onPress={() => onNext?.(otp.join(""))}
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

export default OtpActions;