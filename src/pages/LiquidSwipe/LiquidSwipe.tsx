import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';

import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {onGestureEvent, snapPoint} from 'react-native-redash';
import Weave from './Weave';
import {
  initialSideWidth,
  initialWaveCenter,
  sideWidth,
  waveHorRadius,
  waveHorRadiusBack,
  waveVertRadius,
} from './WeaveHelpers';
import Content, {ContentProps} from './Content';
import Button from './Button';

export const assets = [
  require('./assets/firstPageImage.png'),
  require('./assets/secondPageImage.png'),
];

const front: ContentProps = {
  backgroundColor: '#4d1168',
  source: assets[1],
  title1: 'For',
  title2: 'Gamers',
  color: '#fd5587',
};

const back: ContentProps = {
  backgroundColor: 'white',
  source: assets[0],
  title1: 'Online',
  title2: 'Gambling',
  color: 'black',
};

const {width} = Dimensions.get('window');
const {Value, cond, multiply, divide, interpolate} = Animated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default () => {
  const progress = 0;
  const centerY = initialWaveCenter;
  const horRadius = waveHorRadius(progress);
  const vertRadius = waveVertRadius(progress);
  const sWidth = sideWidth(progress);
  return (
    <View style={styles.container}>
      <Content {...back} />
      <View style={StyleSheet.absoluteFill}>
        <Weave sideWidth={sWidth} {...{centerY, horRadius, vertRadius}} />
        <Button />
      </View>
    </View>
  );
};
