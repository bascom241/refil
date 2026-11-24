import Svg, { Path } from "react-native-svg";

const BottomWaves = () => {
  return (
    <Svg
      width="100%"
      height={100}
      viewBox="0 0 390 100"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        top: 115,
        left: 0,
        right: 0,
        zIndex: 5,
      }}
    >

      {/* Dark orange layer */}
      <Path
        d="
          M0 25
          C55 5, 85 20, 125 38
          C165 55, 200 62, 240 57
          C300 50, 350 25, 390 0
          L390 100
          L0 100
          Z
        "
        fill="#C96508"
      />

      {/* White foreground */}
      <Path
        d="
          M0 5
          C35 -12, 55 0, 90 12
          C130 27, 155 45, 195 48
          C250 52, 310 40, 350 20
          C370 10, 383 3, 390 -5
          L390 100
          L0 100
          Z
        "
        fill="#F5F5F5"
      />

    </Svg>
  );
};

export default BottomWaves;