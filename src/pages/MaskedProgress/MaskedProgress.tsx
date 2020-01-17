import {Dimensions, StyleSheet, View} from 'react-native';
import Svg, {TSpan, ClipPath, Defs, Rect, Text} from 'react-native-svg';
import React from 'react';

const {width, height} = Dimensions.get('window');

export default () => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <View
        style={{
          marginTop: 100,
          width: 120,
        }}>
        <NewText text={1000} progress={70} />
      </View>
    </View>
  );
};

const NewText = ({text = '', progress}: any) => {
  const x = 25;
  const y = 15;
  const fontSize = 16;
  const panelWidth = 100;
  console.log(text.length);

  return (
    <Svg height="100" width="100">
      <Defs {...{width, height}}>
        <ClipPath id="mask">
          <Rect
            rx={5}
            ry={10}
            width={(progress / 100) * panelWidth}
            height={20}
          />
          {/*<Text {...{x, y, fontSize}} fill={'red'}>*/}
          {/*  {text}*/}
          {/*</Text>*/}
        </ClipPath>
      </Defs>

      <Rect rx={5} ry={10} width={panelWidth} height={20} fill={'#c1c1c1'} />
      <Rect
        width={panelWidth}
        height={20}
        fill={'#ff0000'}
        clipPath="url(#mask)"
      />
      <Text {...{y, fontSize}} x={x + 10} fill={'#fff'} textAnchor={'middle'}>
        <TSpan>{text}</TSpan>
      </Text>
      {/*<Text {...{x, y, fontSize}} fill={'#000'} clipPath="url(#mask)">*/}
      {/*  {text}*/}
      {/*</Text>*/}
    </Svg>
  );
};
