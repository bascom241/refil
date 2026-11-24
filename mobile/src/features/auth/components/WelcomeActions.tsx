import { Pressable, Text, View } from 'react-native'
import { GradientText } from './GradientText'

type Props = {
  scale: number
  contentWidth: number
  width: number
}

export function WelcomeActions({
  scale,
  contentWidth,
  width,
}: Props) {
  return (
    <View
      className="absolute items-center"
      style={{
        top: 427 * scale,
        left: (width - contentWidth) / 2,
        width: contentWidth,
      }}
    >
      <Text
        className="text-[#121212]"
        style={{
          fontFamily: 'GeistRegular',
          fontSize: 30 * scale,
          lineHeight: 36 * scale,
          letterSpacing: 1.2 * scale,
        }}
      >
        Welcome!
      </Text>

      <View
        className="w-full"
        style={{
          marginTop: 45 * scale,
          gap: 24 * scale,
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Create Account"
          className="items-center justify-center rounded-full bg-[#F8810B]"
          style={{
            height: 57.842 * scale,
            paddingHorizontal: 20.562 * scale,
          }}
        >
          <Text
            className="text-[#F6F6F6]"
            style={{
              fontFamily: 'GeistSemiBold',
              fontSize: 20.562 * scale,
            }}
          >
            Create Account
          </Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Login"
          className="items-center justify-center rounded-full border border-[#F8810B]"
          style={{
            height: 57.842 * scale,
            paddingHorizontal: 20.562 * scale,
          }}
        >
          <GradientText scale={scale} />
        </Pressable>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Continue as Guest"
        className="mt-11"
      >
        <Text
          className="text-[#121212]"
          style={{
            fontFamily: 'GeistRegular',
            fontSize: 14 * scale,
          }}
        >
          Continue as Guest?
        </Text>
      </Pressable>
    </View>
  )
}