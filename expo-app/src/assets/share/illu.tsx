import * as React from 'react';
import Svg, { Path, Defs, Pattern, Use, Image } from 'react-native-svg';

export function Illu() {
  return (
    <Svg width={299} height={299} viewBox="0 0 299 299" fill="none">
      <Path fill="url(#pattern0)" d="M0 0H299V299H0z" />
      <Defs>
        <Pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <Use xlinkHref="#image0_158_6623" transform="scale(.00024)" />
        </Pattern>
        <Image
          id="image0_158_6623"
          width={4096}
          height={4096}
        />
      </Defs>
    </Svg>
  );
}