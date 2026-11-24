import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

export type AuthProgressStep = 1 | 2 | 3 | 4 ;

type Props = {
  currentStep: AuthProgressStep;
};

const steps: AuthProgressStep[] = [1, 2, 3, 4];

export function AuthProgress({ currentStep }: Props) {
  return (
    <View
      accessibilityLabel={`Step ${currentStep} of ${steps.length}`}
      className="mt-[35px] flex-row items-center justify-center gap-[5px]"
    >
      {steps.map((step) =>
        step === currentStep ? (
          <LinearGradient
            key={step}
            colors={["#F8810B", "#D56D07"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{
              width: 29,
              height: 8,
              borderRadius: 999,
              overflow: "hidden",
            }}
          />
        ) : (
          <View
            key={step}
            className="h-[8px] w-[8px] rounded-full bg-[#121212]"
          />
        ),
      )}
    </View>
  );
}