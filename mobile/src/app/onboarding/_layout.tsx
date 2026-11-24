
import Stack from 'expo-router/stack'

export default function OnboardingLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
    )
}