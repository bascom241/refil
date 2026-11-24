import { Image, Pressable, Text, TextInput, View } from "react-native";

import { AuthProgress, type AuthProgressStep } from "@/components/auth/AuthProgress";
import { registerTokens } from "@/constants/register";
import { useRegisterStore } from "@/features/auth/store/registerStore";

interface Props {
    contentWidth: number;
    currentStep: AuthProgressStep;
    onNext?: () => void;
}

const RegisterActions = ({
    contentWidth,
    currentStep,
    onNext,
}: Props) => {
    const phone = useRegisterStore((state) => state.phoneNumber);
    const firstName = useRegisterStore((state) => state.firstName);
    const lastName = useRegisterStore((state) => state.lastName);
    const setPhone = useRegisterStore((state) => state.setPhoneNumber);
    const setFirstName = useRegisterStore((state) => state.setFirstName);
    const setLastName = useRegisterStore((state) => state.setLastName);

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
                Create Account
            </Text>

            <View className="mt-[35px] w-full gap-[26px]">
                <View className="w-full gap-[10px]">
                    <Text
                        className="ml-0 text-[12px] leading-[19px] tracking-[-0.24px] text-[#606060]"
                        style={{ fontFamily: registerTokens.fonts.regular }}
                    >
                        Phone No
                    </Text>

                    <View className="h-[58px] w-full flex-row items-center rounded-full border border-[#F8810B] bg-[#F6F6F6] pl-[5px] pr-5">
                        <View className="h-full flex-row items-center gap-[6px] border-r border-[#606060] pl-[10px] pr-[10px]">
                            <Image
                                accessibilityLabel="Nigeria"
                                source={require("@assets/images/Onboarding/nigeria-flag.png")}
                                className="h-8 w-8 rounded-full"
                                resizeMode="cover"
                            />
                            <Image
                                accessible={false}
                                source={require("@assets/images/Onboarding/chevron-down.png")}
                                className="h-3 w-3"
                                resizeMode="contain"
                            />
                        </View>
                        <TextInput
                            className="h-full flex-1 pl-[10px] text-[14px] leading-[21px] tracking-[-0.14px] text-[#1A1C1E]"
                            style={{ fontFamily: registerTokens.fonts.regular }}
                            accessibilityLabel="Phone number"
                            placeholder="(+234) 9135-464-740"
                            placeholderTextColor="#1A1C1E"
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={setPhone}
                        />
                    </View>
                </View>

                <View className="w-full gap-[10px]">
                    <Text
                        className="text-[12px] leading-[19px] tracking-[-0.24px] text-[#606060]"
                        style={{ fontFamily: registerTokens.fonts.regular }}
                    >
                        First Name
                    </Text>
                    <TextInput
                        className="h-[58px] w-full rounded-full border border-[#F8810B] bg-[#F6F6F6] px-5 text-[14px] leading-[21px] tracking-[-0.14px] text-[#1A1C1E]"
                        style={{ fontFamily: registerTokens.fonts.regular }}
                        accessibilityLabel="First name"
                        placeholder="John"
                        placeholderTextColor="#1A1C1E"
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                </View>

                <View className="w-full gap-[10px]">
                    <Text
                        className="text-[12px] leading-[19px] tracking-[-0.24px] text-[#606060]"
                        style={{ fontFamily: registerTokens.fonts.regular }}
                    >
                        Last Name
                    </Text>
                    <TextInput
                        className="h-[58px] w-full rounded-full border border-[#F8810B] bg-[#F6F6F6] px-5 text-[14px] leading-[21px] tracking-[-0.14px] text-[#1A1C1E]"
                        style={{ fontFamily: registerTokens.fonts.regular }}
                        accessibilityLabel="Last name"
                        placeholder="John"
                        placeholderTextColor="#1A1C1E"
                        value={lastName}
                        onChangeText={setLastName}
                    />
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

export default RegisterActions;