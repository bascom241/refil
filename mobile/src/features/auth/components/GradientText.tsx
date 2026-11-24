import { registerTokens } from '@/constants/register';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Text as SvgText,
} from 'react-native-svg'

type Props = {
  scale: number
}

export function GradientText({ scale }: Props) {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 350 58"
    >
      <Defs>
        <LinearGradient
          id="loginTextGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <Stop offset="0%" stopColor="#D56D07" />
          <Stop offset="100%" stopColor="#EA8827" />
        </LinearGradient>
      </Defs>

      <SvgText
        x="175"
        y="37"
        textAnchor="middle"
        fontFamily={registerTokens.fonts.semibold}
        fontSize={20.562 * scale}
        fill="url(#loginTextGradient)"
      >
        Login
      </SvgText>
    </Svg>
  )
}