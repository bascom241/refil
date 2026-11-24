
import { colors } from "./Colors";
import { fonts } from "./fonts";
import { layout } from "./layout";

export const onboardingTokens = {
  frame: {
    width: 430,
    height: 926,
  },
  colors,
  fonts: fonts.onboarding,
  layout: layout.onboarding,
} as const;

export const onboardingSteps = [
  {
    image: require("@assets/images/Onboarding/bike.png"),
    title: "Seamless Gas Deliveries,\nRight When You Need Them",
    description:
      "Manage your gas deliveries with ease using Refill app.",
  },
  {
    image: require("@assets/images/Onboarding/bike.png"),
    title: "Track every Delivery\nin Real Time",
    description:
      "Get instant updates from pickup to doorstep.",
  },
  {
    image: require("@assets/images/Onboarding/bike.png"),
    title: "Safe, Trusted & Verified,\nRiders",
    description:
      "Your gas refills are handled very carefully",
  },
];


