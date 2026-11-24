import { Image } from 'react-native'

type Props = {
  scale: number
  width: number
}

export function WelcomeBackground({ scale, width }: Props) {
  return (
    <>
      <Image
        source={require('@assets/images/Onboarding/welcome-gradient.png')}
        resizeMode="stretch"
        className="absolute"
        style={{
          left: -321 * scale,
          top: -420 * scale,
          width: 1017 * scale,
          height: 1703 * scale,
        }}
      />

      <Image
        source={require('@assets/images/Onboarding/Vector.png')}
        resizeMode="stretch"
        className="absolute bottom-0 left-0"
        style={{
          width,
          height: 678.477 * scale,
        }}
      />
    </>
  )
}