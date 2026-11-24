import { onboardingTokens } from "@/constants/onboarding";
import { registerTokens } from "@/constants/register";

export function getWelcomeLayout(width: number, height: number) {
    const widthRatio = width / onboardingTokens.frame.width;
    const heightRatio = Math.min(1, height / onboardingTokens.frame.height);
    const horizontalInset = Math.max(
        20,
        Math.min(
            onboardingTokens.layout.horizontalInset,
            width * (onboardingTokens.layout.horizontalInset / onboardingTokens.frame.width),
        ),
    );

    return {
        artworkScale: widthRatio,
        contentWidth: Math.min(
            onboardingTokens.layout.contentWidth,
            Math.max(0, width - horizontalInset * 2),
        ),

        topPadding: Math.max(72, onboardingTokens.layout.brandTop * heightRatio),
        bottomPadding: Math.max(
            24,
            onboardingTokens.layout.contentBottom * heightRatio,
        ),
        titleGap: Math.max(28, 45 * heightRatio),
        guestGap: Math.max(28, 45 * heightRatio),
    };
}


export function getRegisterLayout(width: number, height: number) {
    const widthRatio = width / registerTokens.frame.width;
    const heightRatio = Math.min(1, height / registerTokens.frame.height);
    const horizontalInset = Math.max(
        20,
        Math.min(
            registerTokens.layout.horizontalInset,
            width *
                (registerTokens.layout.horizontalInset /
                    registerTokens.frame.width),
        )
    )

    return {
        artworkScale: widthRatio,
        contentWidth: Math.min(
            registerTokens.layout.contentWidth,
            Math.max(0, width - horizontalInset * 2)
        ),
        topPadding: Math.max(
            72,
            registerTokens.layout.brandTop * heightRatio,
        ),
        bottomPadding: Math.max(
            24,
            (registerTokens.frame.height -
                registerTokens.layout.contentTop -
                registerTokens.layout.contentHeight) * heightRatio,
        ),
    }
}