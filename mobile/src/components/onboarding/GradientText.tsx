import { registerTokens } from '@/constants/register';
import Svg, {
    Defs,
    LinearGradient,
    Stop,
    Text as SvgText,
} from "react-native-svg";

import { onboardingTokens } from "@/constants/onboarding";

interface Gradient {
    text: string
}

export function GradientText({ text }: Gradient) {
    return (
        <Svg
            accessibilityLabel="Login"
            width={70}
            height={30}
            viewBox="0 0 70 30"
            pointerEvents="none"
        >
            <Defs>
                <LinearGradient
                    id="loginTextGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                >
                    <Stop offset="0%" stopColor={onboardingTokens.colors.loginGradientStart} />
                    <Stop offset="100%" stopColor={onboardingTokens.colors.loginGradientEnd} />
                </LinearGradient>
            </Defs>
            <SvgText
                x="35"
                y="22"
                textAnchor="middle"
                fontFamily={registerTokens.fonts.semibold}
                fontSize={20}
                fill="url(#loginTextGradient)"
            >
                {text}
            </SvgText>
        </Svg>
    );
}