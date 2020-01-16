import React from 'react';
import {Dimensions, PixelRatio} from 'react-native';
import Svg, {TSpan, Image, Rect, Text} from 'react-native-svg';
import TouchableOpacityG from './TouchableOpacityG';

const {width, height} = Dimensions.get('window');

export interface ContentProps {
  color1: string;
  color2: string;
  backgroundColor: string;
  source: number;
  title1: string;
  title2: string;
}

export default ({
  color1,
  color2,
  backgroundColor,
  source,
  title1,
  title2,
}: ContentProps) => {
  const font = 10 * PixelRatio.get();
  const space = 16 * PixelRatio.get();
  const firstLetterPosition = height - height / 3 - 50;

  return (
    <>
      <Rect
        x={0}
        y={0}
        {...{width, height}}
        fill={backgroundColor}
        clipPath="url(#mask)"
      />
      <Image
        x={(width - width * 0.65) / 2}
        y={50}
        width={width * 0.61}
        href={source}
        clipPath="url(#mask)"
      />
      <Text
        x={space}
        y={firstLetterPosition}
        fontSize={48}
        fontWeight={300}
        fill={color1}
        clipPath="url(#mask)">
        {title1}
      </Text>

      <Text
        x={space}
        y={firstLetterPosition + 50}
        fontSize={48}
        fontWeight={600}
        fill={color1}
        clipPath="url(#mask)">
        {title2}
      </Text>
      <Text
        y={firstLetterPosition + 47 * 2}
        fontSize={font}
        fill={color2}
        clipPath="url(#mask)">
        <TSpan x={space} dy={0}>
          Lorem ipsum dolor sit amet,
        </TSpan>
        <TSpan x={space} dy={20 + 2}>
          consectetur adipiscing elit.
        </TSpan>
        <TSpan x={space} dy={20 + 4}>
          Donec rutrum rutrum sem dictum.
        </TSpan>
      </Text>
      <TouchableOpacityG
        onPress={() => {
          console.log('test');
        }}>
        <>
          <Rect
            x={space}
            width={200}
            height={50}
            y={firstLetterPosition + 57 * 3}
            fill={color1}
            clipPath="url(#mask)"
          />
          <Text
            x={space + 48}
            y={firstLetterPosition + 57 * 3 + 37}
            fontSize={32}
            fill={'#fff'}>
            Yeah !!
          </Text>
        </>
      </TouchableOpacityG>
    </>
  );
};
