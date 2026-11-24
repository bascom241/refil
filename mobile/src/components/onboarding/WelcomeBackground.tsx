import { Image } from "react-native";

import { onboardingTokens } from "@/constants/onboarding";

type Props = {
  scale: number;
  width: number;
};

export function WelcomeBackground({ scale, width }: Props) {
  const frameWidth = onboardingTokens.frame.width;
  const artLeft = (width - frameWidth * scale) / 2 - 321 * scale;

  return (
    <>
      <Image
        accessible={false}
        source={require("@assets/images/Onboarding/welcome-gradient.png")}
        resizeMode="stretch"
        className="absolute"
        style={{
          left: artLeft,
          top: -420 * scale,
          width: 1017 * scale,
          height: 1703 * scale,
        }}
      />
      <Image
        accessible={false}
        source={require("@assets/images/Onboarding/Vector.png")}
        resizeMode="stretch"
        className="absolute bottom-0 left-0"
        style={{
          width,
          height:
            onboardingTokens.layout.backgroundWaveHeight *
            (width / frameWidth),
        }}
      />
    </>
  );
}