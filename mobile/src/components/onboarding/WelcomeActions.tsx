import { registerTokens } from '@/constants/register';
import { Pressable, Text, View } from "react-native";

import { onboardingTokens } from "@/constants/onboarding";
import { GradientText } from "./GradientText";
type Props = {
    contentWidth: number;
    titleGap: number;
    guestGap: number;
    onCreateAccount?: () => void;
    onLoginAccount?: () => void;
    onContinueAsGuest?: () => void;
    header: string
    btnText1: string
    btnText2: string
};


export function WelcomeActions({
    contentWidth,
    titleGap,
    guestGap,
    onCreateAccount,

    onLoginAccount,
    onContinueAsGuest,
    header,
    btnText1,
    btnText2
}: Props) {
    return (
        <View className="items-center" style={{ width: contentWidth }}>
            <Text
                className="text-center text-[30px] leading-9 tracking-[1.2px] text-[#121212]"
                style={{ fontFamily: registerTokens.fonts.regular }}
            >
                {header}
            </Text>

            <View className="mt-6 w-full gap-6" style={{ marginTop: titleGap }}>
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Create Account"
                    onPress={onCreateAccount}
                    className="h-[58px] w-full items-center justify-center rounded-full border border-[#F8810B] bg-[#F8810B] px-5"
                    style={{
                        shadowColor: onboardingTokens.colors.shadow,
                        shadowOpacity: 1,
                        shadowRadius: 10,
                        shadowOffset: { width: 0, height: 10 },
                        elevation: 1,
                    }}
                >
                    <Text
                        className="text-center text-[20px] text-[#F6F6F6]"
                        style={{ fontFamily: registerTokens.fonts.semibold }}
                    >
                        {btnText1}
                    </Text>
                </Pressable>

                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Login"
                    onPress={onLoginAccount}
                    className="h-[58px] w-full items-center justify-center rounded-full border border-[#F8810B] px-5"
                    style={{
                        shadowColor: onboardingTokens.colors.shadow,
                        shadowOpacity: 1,
                        shadowRadius: 20,
                        shadowOffset: { width: 0, height: 10 },
                        elevation: 1,
                    }}
                >
                    <GradientText 
                        text={btnText2}
                    />
                </Pressable>
            </View>

            <Pressable
                accessibilityRole="button"
                accessibilityLabel="Continue as Guest"
                onPress={onContinueAsGuest}
                className="mt-11"
                style={{ marginTop: guestGap }}
            >
                <Text
                    className="text-center text-[14px] text-[#121212]"
                    style={{ fontFamily: registerTokens.fonts.regular }}
                >
                    Continue as Guest?
                </Text>
            </Pressable>
        </View>
    );
}