import Svg, {
  Circle,
  Ellipse,
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';

import React from 'react';
import {View, StyleSheet} from 'react-native';

export default class SvgExample extends React.Component {
  render() {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          {alignItems: 'center', justifyContent: 'center'},
        ]}>
        <Svg
          width={this.props.size}
          height={this.props.size}
          fill={this.props.color}
          viewBox="0 0 515.556 515.556">
          <Path d="m515.556 311.807v-108.058l-44.101-17.653c-3.304-9.849-7.285-19.447-11.895-28.729l18.707-43.645-76.417-76.465-43.676 18.754c-9.267-4.626-18.864-8.591-28.714-11.895l-17.637-44.116h-108.09l-17.637 44.117c-9.849 3.304-19.447 7.269-28.714 11.895l-43.676-18.754-76.418 76.465 18.707 43.645c-4.61 9.283-8.591 18.88-11.895 28.729l-44.1 17.652v108.058l44.101 17.653c3.304 9.849 7.285 19.447 11.895 28.729l-18.707 43.645 76.418 76.465 43.676-18.754c9.267 4.626 18.864 8.591 28.714 11.895l17.637 44.117h108.089l17.637-44.117c9.849-3.304 19.447-7.269 28.714-11.895l43.676 18.754 76.418-76.465-18.707-43.645c4.61-9.283 8.591-18.88 11.895-28.729zm-257.778 74.86c-71.068 0-128.889-57.805-128.889-128.889s57.821-128.889 128.889-128.889 128.889 57.805 128.889 128.889-57.821 128.889-128.889 128.889z" />
        </Svg>
      </View>
    );
  }
}
