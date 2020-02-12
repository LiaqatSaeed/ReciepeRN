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
          viewBox="0 0 10.85 9.728">
          <G id="icon-arrow-small" transform="translate(0.5 0.707)">
            <Path
              id="path"
              d="M1281.487,1163.709l4.157,4.157-4.157,4.157"
              transform="translate(-1275.794 -1163.709)"
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
            />
            <Line
              id="line"
              x1="9.326"
              transform="translate(0 4.155)"
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-width="1"
            />
          </G>
        </Svg>
      </View>
    );
  }
}
