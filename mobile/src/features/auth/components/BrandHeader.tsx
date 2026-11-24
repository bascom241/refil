import { Image, Text, View } from 'react-native'

type Props = {
  scale: number
}

export function BrandHeader({ scale }: Props) {
  return (
    <View
      className="absolute left-0 right-0 items-center"
      style={{ top: 106 * scale }}
    >
      <Image
        source={require('@assets/images/Onboarding/logo.png')}
        resizeMode="contain"
        style={{
          width: 40 * scale,
          height: 68.571 * scale,
        }}
      />

      <Text
        className="text-[#F6F6F6]"
        style={{
          marginTop: 6 * scale,
          fontFamily: 'GeistSemiBold',
          fontSize: 28 * scale,
          lineHeight: 34 * scale,
          letterSpacing: 0.28 * scale,
        }}
      >
        Refill
      </Text>
    </View>
  )
}