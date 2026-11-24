import { DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import Stack from 'expo-router/stack';
import { useFonts } from "expo-font"
import "./global.css"
import { QueryProvider } from '@/providers/QueryProvider';
import Toast from 'react-native-toast-message';
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { setAuthExpiredHandler } from "@/base/axiosInstance";
SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const router = useRouter();
  const [loaded] = useFonts({

    // Inter 
    InterBold: require("@assets/fonts/Inter/static/Inter_18pt-Bold.ttf"),
    InterLight: require("@assets/fonts/Inter/static/Inter_18pt-Light.ttf"),
    InterMedium: require('@assets/fonts/Inter/static/Inter_18pt-Medium.ttf'),


    PoppinsBold: require("@assets/fonts/Poppins/Poppins-Bold.ttf"),
    PoppinsLight: require("@assets/fonts/Poppins/Poppins-Light.ttf"),
    PoppinsNormal: require("@assets/fonts/Poppins/Poppins-Medium.ttf"),

    RobotoBold: require("@assets/fonts/Roboto/static/Roboto-Bold.ttf"),
    RobotoLight: require("@assets/fonts/Roboto/static/Roboto-Light.ttf"),
    RobotoNormal: require("@assets/fonts/Roboto/static/Roboto-Medium.ttf"),

    OnestBold: require("@assets/fonts/Onest/static/Onest-Bold.ttf"),
    OnestLight: require("@assets/fonts/Onest/static/Onest-Light.ttf"),
    OnestMedium: require("@assets/fonts/Onest/static/Onest-Medium.ttf"),

    GeistRegular: require("@assets/fonts/static/Geist-Regular.ttf"),
    GeistSemiBold: require("@assets/fonts/static/Geist-SemiBold.ttf")

  })
  useEffect(() => {
    setAuthExpiredHandler(() => router.replace("/auth/login"));
    return () => setAuthExpiredHandler(undefined);
  }, [router]);

  return (
    <ThemeProvider value={DefaultTheme}>
      <QueryProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name='auth' options={{ headerShown: false }} />
          <Stack.Screen name="tabs" options={{headerShown: false}} />
        </Stack>
      </QueryProvider>
      <Toast/>
    </ThemeProvider>
  );
}
