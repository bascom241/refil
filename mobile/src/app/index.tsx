import { View, Text, Image } from 'react-native'
import { colors } from '@/constants/Colors'
import { useEffect } from 'react'
import {useRouter} from 'expo-router'
import { restoreSession } from "@/features/auth/api/auth";


const Root = () => {
  const logo = require("@assets/images/Onboarding/logo.png");
  const refill = require("@assets/images/Onboarding/n.png");
  const router = useRouter();

  useEffect(() => {
    let active = true;
    const initializeApp = async () => {
      try {
        const [hasSession] = await Promise.all([
          restoreSession(),
          new Promise((resolve) => setTimeout(resolve, 3000)),
        ]);
        if (active) {
          router.replace(hasSession ? "/tabs" : "/onboarding");
        }
      } catch (error) {
        console.error("Could not restore the saved session:", error);
        if (active) {
          router.replace("/onboarding");
        }
      }
    };

    void initializeApp();
    return () => {
      active = false;
    };
  }, [router]);
  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: colors.primary }}
    >

      <View className="flex-column items-center
        justify-center space-x-2">
        <Image
          source={logo}
          width={38.65}
          height={78.76}
        />

        <Image
          source={refill}
          width={26.97}
          height={70}
        />

      </View>

    </View>
  )
}

export default Root
