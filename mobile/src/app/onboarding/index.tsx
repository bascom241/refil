import { useState } from "react";
import { onboardingSteps } from "@/constants/onboarding";
import OnboardingStep from "@/components/onboarding/OnboardingStep";
import { useRouter } from "expo-router";

const Onboarding = () => {
  const [activeStep, setActiveStep] = useState(0);

  const currentStep = onboardingSteps[activeStep];
  const router = useRouter()

  const handleNext = () => {
    if (activeStep < onboardingSteps.length - 1) {
      setActiveStep((current) => current + 1);
    } else {
        router.replace("/auth")
      console.log("Finished onboarding");
    }
  };

  const handleSkip = () => {
    // Navigate to your app
    console.log("Skipped onboarding");
  };

  return (
    <OnboardingStep
      activeStep={activeStep}
      image={currentStep.image}
      title={currentStep.title}
      description={currentStep.description}
      onNext={handleNext}
      onSkip={handleSkip}
    />
  );
};

export default Onboarding;