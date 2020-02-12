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
          viewBox="0 0 384 384">
          <G>
            <G>
              <G>
                <Path d="M316.48,46.187l-30.187,30.187c33.493,27.413,55.04,68.907,55.04,115.627c0,82.453-66.88,149.333-149.333,149.333     S42.667,274.453,42.667,192c0-46.72,21.547-88.213,55.04-115.627L67.52,46.187C26.347,81.387,0,133.547,0,192     c0,106.027,85.973,192,192,192s192-85.973,192-192C384,133.547,357.653,81.387,316.48,46.187z" />
                <Rect x="170.667" y="0" width="42.667" height="213.333" />
              </G>
            </G>
          </G>
        </Svg>
      </View>
    );
  }
}
