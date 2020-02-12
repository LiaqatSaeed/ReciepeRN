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
          viewBox="0 0 21 16">
          <G id="icon-mail" transform="translate(0.5 0.5)">
            <Path
              id="path"
              d="M454,604v6.994A4.005,4.005,0,0,1,449.994,615H438.006A4.005,4.005,0,0,1,434,610.994V604"
              transform="translate(-434 -600)"
              fill="none"
              stroke="#a6bcd0"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
            />
            <Path
              id="path-2"
              data-name="path"
              d="M439.175,600H452.1l-8.212,8.5L435.68,600Z"
              transform="translate(-434 -600)"
              fill="none"
              stroke="#a6bcd0"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
            />
          </G>
        </Svg>
      </View>
    );
  }
}
