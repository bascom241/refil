import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Platform, ScrollView, useWindowDimensions, View } from "react-native";
import { useRouter } from "expo-router";

import LoginActions from "@/components/auth/LoginAction";
import { BrandHeader } from "@/components/onboarding/BrandHeader";
import { WelcomeBackground } from "@/components/onboarding/WelcomeBackground";
import { getRegisterLayout } from "@/utils/responsive";

export default function PasswordScreen() {
    const { width, height } = useWindowDimensions();
    const layout = getRegisterLayout(width, height);
    const router = useRouter();

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
                    <LoginActions
                        contentWidth={layout.contentWidth}
                        currentStep={2}
                        onNext={() => router.push("/auth/verify")}
                    />
                    <View />
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
