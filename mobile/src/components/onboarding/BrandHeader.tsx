import { registerTokens } from '@/constants/register';
import { Image, Text, View } from "react-native";

import { onboardingTokens } from "@/constants/onboarding";

export function BrandHeader() {
  return (
    <View className="items-center">
      <Image
        accessibilityLabel="Refill logo"
        source={require("@assets/images/Onboarding/logo.png")}
        resizeMode="contain"
        style={{ width: 40, height: 68.571 }}
      />
      <Text
        className="mt-1.5 text-[28px] leading-[34px] tracking-[0.28px] text-[#F6F6F6]"
        style={{ fontFamily: registerTokens.fonts.semibold }}
      >
        Refill
      </Text>
    </View>
  );
}