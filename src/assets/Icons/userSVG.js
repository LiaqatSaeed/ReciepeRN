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
          viewBox="-37 211.179 500 499.821">
         <G>
           <G>
              <Path
                d="M213,211.09c-137.848,0-250,112.152-250,250s112.152,250,250,250s250-112.152,250-250S350.848,211.09,213,211.09z
			 M213,284.007c66.05,0,119.792,53.741,119.792,119.792S279.05,523.59,213,523.59S93.208,469.849,93.208,403.798
			S146.95,284.007,213,284.007z M213,669.423c-68.073,0-128.438-32.964-166.478-83.608C88.198,565.762,147.715,544.423,213,544.423
			c65.29,0,124.812,21.342,166.479,41.39C341.438,636.458,281.074,669.423,213,669.423z"
              />
            </G>
          </G>
        </Svg>
      </View>
    );
  }
}
