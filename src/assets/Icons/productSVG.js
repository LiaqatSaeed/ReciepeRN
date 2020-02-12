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
          viewBox="0 0 480 480"
          width={this.props.size}
          height={this.props.size}
          fill={this.props.color}
         >
          <G>
            <G>
              <Path d="M80,48H16C7.168,48,0,55.168,0,64v64c0,8.832,7.168,16,16,16c8.832,0,16-7.168,16-16V80h48c8.832,0,16-7.168,16-16    C96,55.168,88.832,48,80,48z" />
            </G>
          </G>
          <G>
            <G>
              <Path d="M464,336c-8.832,0-16,7.168-16,16v48h-48c-8.832,0-16,7.168-16,16c0,8.832,7.168,16,16,16h64c8.832,0,16-7.168,16-16v-64    C480,343.168,472.832,336,464,336z" />
            </G>
          </G>
          <G>
            <G>
              <Path d="M464,48h-64c-8.832,0-16,7.168-16,16c0,8.832,7.168,16,16,16h48v48c0,8.832,7.168,16,16,16c8.832,0,16-7.168,16-16V64    C480,55.168,472.832,48,464,48z" />
            </G>
          </G>
          <G>
            <G>
              <Path d="M80,400H32v-48c0-8.832-7.168-16-16-16c-8.832,0-16,7.168-16,16v64c0,8.832,7.168,16,16,16h64c8.832,0,16-7.168,16-16    C96,407.168,88.832,400,80,400z" />
            </G>
          </G>
          <G>
            <G>
              <Rect x="64" y="112" width="32" height="256" />
            </G>
          </G>
          <G>
            <G>
              <Rect x="128" y="112" width="32" height="192" />
            </G>
          </G>
          <G>
            <G>
              <Rect x="192" y="112" width="32" height="192" />
            </G>
          </G>
          <G>
            <G>
              <Rect x="256" y="112" width="32" height="256" />
            </G>
          </G>
          <G>
            <G>
              <Rect x="320" y="112" width="32" height="192" />
            </G>
          </G>
          <G>
            <G>
              <Rect x="384" y="112" width="32" height="256" />
            </G>
          </G>
          <G>
            <G>
              <Rect x="128" y="336" width="32" height="32" />
            </G>
          </G>
          <G>
            <G>
              <Rect x="192" y="336" width="32" height="32" />
            </G>
          </G>
          <G>
            <G>
              <Rect x="320" y="336" width="32" height="32" />
            </G>
          </G>
        </Svg>
      </View>
    );
  }
}
