import React, {Component} from 'react';
import {Animated, Easing} from 'react-native';
import {G} from 'react-native-svg';

const AnimatedG = Animated.createAnimatedComponent(G);

function flattenStyle(style) {
  if (style === null || typeof style !== 'object') {
    return undefined;
  }

  if (!Array.isArray(style)) {
    return style;
  }

  const result = {};
  for (let i = 0, styleLength = style.length; i < styleLength; ++i) {
    const computedStyle = flattenStyle(style[i]);
    if (computedStyle) {
      for (const key in computedStyle) {
        result[key] = computedStyle[key];
      }
    }
  }
  return result;
}

/**
 * A wrapper for making svg elements respond properly to touches.
 * On press down, the opacity of the wrapped element is decreased, dimming it.
 *
 * Opacity is controlled by wrapping the children in an Animated.G, which is
 * added to the view hierarchy.
 *
 * Example:
 *
 * ```
 * renderRect: function() {
 *   return (
 *     <TouchableOpacityG
 *       onPress={e => {
 *         console.log('press', e);
 *       }}>
 *       <Rect x="0" y="50" width="100" height="50" fill="blue" />
 *     </TouchableOpacityG>
 *   );
 * },
 * ```
 * ### Example
 *
 * ```ReactNativeWebPlayer
 * import React from "react";
 * import {
 *   AppRegistry,
 * } from 'react-native'
 * import Svg, {
 *     Rect,
 * } from "react-native-svg";
 *
 * import TouchableOpacityG from './TouchableOpacityG';
 *
 * const App = () => (
 *     <Svg width="200" height="200" viewBox="0 0 100 100">
 *         <Rect
 *             x="0"
 *             y="0"
 *             width="100"
 *             height="50"
 *             fill="red"
 *             onPress={e => {
 *                 console.log('press1', e);
 *             }}
 *         />
 *         <TouchableOpacityG
 *             onPress={e => {
 *                 console.log('press2', e);
 *             }}>
 *             <Rect x="0" y="50" width="100" height="50" fill="blue" />
 *         </TouchableOpacityG>
 *     </Svg>
 * );
 *
 * AppRegistry.registerComponent('App', () => App)
 * ```
 *
 */
export default class TouchableOpacityG extends Component {
  static defaultProps = {
    activeOpacity: 0.2,
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.disabled !== prevProps.disabled) {
      this._opacityInactive(250);
    }
  };

  /**
   * Animate the touchable to a new opacity.
   */
  setOpacityTo = (value, duration) => {
    Animated.timing(this.state.anim, {
      toValue: value,
      duration: duration,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  touchableHandleActivePressIn = e => {
    if (e.dispatchConfig.registrationName === 'onResponderGrant') {
      this._opacityActive(0);
    } else {
      this._opacityActive(150);
    }
    this.props.onPressIn && this.props.onPressIn(e);
  };

  touchableHandleActivePressOut = e => {
    this._opacityInactive(250);
    this.props.onPressOut && this.props.onPressOut(e);
  };

  touchableHandlePress = e => {
    this.props.onPress && this.props.onPress(e);
  };

  touchableHandleLongPress = e => {
    this.props.onLongPress && this.props.onLongPress(e);
  };

  _opacityActive = duration => {
    this.setOpacityTo(this.props.activeOpacity, duration);
  };

  _opacityInactive = duration => {
    this.setOpacityTo(this._getChildStyleOpacityWithDefault(), duration);
  };

  _getChildStyleOpacityWithDefault = () => {
    const childStyle = flattenStyle(this.props.style) || {};
    return childStyle.opacity == null ? 1 : childStyle.opacity;
  };

  state = {
    anim: new Animated.Value(this._getChildStyleOpacityWithDefault()),
  };

  render() {
    return (
      <AnimatedG
        opacity={this.state.anim}
        onPress={this.touchableHandlePress}
        onLongPress={this.touchableHandleLongPress}
        onPressIn={this.touchableHandleActivePressIn}
        onPressOut={this.touchableHandleActivePressOut}>
        {this.props.children}
      </AnimatedG>
    );
  }
}
