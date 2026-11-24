import { StatusBar } from "expo-status-bar";
import { ScrollView, useWindowDimensions, View } from "react-native";

import { BrandHeader } from "@/components/onboarding/BrandHeader";
import { WelcomeActions } from "@/components/onboarding/WelcomeActions";
import { WelcomeBackground } from "@/components/onboarding/WelcomeBackground";
import { getWelcomeLayout } from "@/utils/responsive";
import { useRouter  } from "expo-router";

export default function WelcomeScreen() {
  const { width, height } = useWindowDimensions();
  const layout = getWelcomeLayout(width, height);


  const router = useRouter();

  const onCreateAccount = () => {
    router.push("/auth/register")
  }


  const onLoginAccount = () => {
    router.push("/auth/login")
  }

  return (
    <View
      className="flex-1 overflow-hidden bg-white"
      style={{
        borderRadius: 50,
      }}
    >
      <StatusBar style="light" />

      <WelcomeBackground
        scale={layout.artworkScale}
        width={width}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: layout.topPadding,
          paddingBottom: layout.bottomPadding,
        }}
        showsVerticalScrollIndicator={false}
      >
        <BrandHeader />
        <WelcomeActions
          contentWidth={layout.contentWidth}
          titleGap={layout.titleGap}
          guestGap={layout.guestGap}
          onCreateAccount={onCreateAccount}
          onLoginAccount={onLoginAccount}
          header="Welcome"
          btnText1="Register"
          btnText2="Login"

        />
      </ScrollView>
    </View>
  );
}