import { registerTokens } from '@/constants/register';
import { View, Text, Pressable } from "react-native";
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/constants/Colors";

type OnboardingStepProps = {
  activeStep: number;
  image: any;
  title: string;
  description: string;
  onNext: () => void;
  onSkip: () => void;
};

const OnboardingStep = ({
  activeStep,
  image,
  title,
  description,
  onNext,
  onSkip,
}: OnboardingStepProps) => {
  return (
    <View className="flex-1">

      {/* Background */}
      <ImageBackground
        source={image}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
        contentFit="cover"
      />

      {/* Top section */}
      <View className="absolute top-18 left-4 right-4 flex-row items-center">
        <View className="flex-1 flex-row items-center justify-between">

          {/* Progress indicators */}
          <View className="flex-row gap-2">
            {[0, 1, 2].map((_, index) => (
              <View
                key={index}
                className="h-2 w-[100px] rounded-full"
                style={{
                  backgroundColor:
                    activeStep === index
                      ? "#FFFFFF"
                      : "rgba(255,255,255,0.45)",
                }}
              />
            ))}
          </View>

          {/* Skip */}
          <Pressable onPress={onSkip}>
            <Text
              style={{
                fontFamily: registerTokens.fonts.semibold,
                color: "white",
              }}
            >
              Skip
            </Text>
          </Pressable>

        </View>
      </View>

      {/* Gradient */}
      <LinearGradient
        colors={[
          "transparent",
          "rgba(255,255,255,0.5)",
          "#FFFFFF",
        ]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "45%",
          zIndex: 1,
        }}
      />

      {/* Bottom content */}
      <View
        className="absolute bottom-15 left-4 right-4"
        style={{ zIndex: 2 }}
      >

        <Text
          className="text-center text-2xl text-black"
          style={{
            fontFamily: registerTokens.fonts.regular,
          }}
        >
          {title}
        </Text>

        <Text
          className="mt-3 text-center text-sm text-gray-600"
          style={{
            fontFamily: registerTokens.fonts.regular,
          }}
        >
          {description}
        </Text>

        <Pressable
          onPress={onNext}
          className="mt-6 mb-3 h-14 items-center justify-center rounded-xl"
          style={{
            backgroundColor: colors.primary,
          }}
        >
          <Text
            style={{
              fontFamily: registerTokens.fonts.semibold,
              color: "white",
            }}
          >
            {activeStep === 2 ? "Get Started" : "Next"}
          </Text>
        </Pressable>

      </View>

    </View>
  );
};

export default OnboardingStep;