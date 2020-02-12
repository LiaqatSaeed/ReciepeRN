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
          viewBox="0 250 500 500.001">
         <G>
           <G>
             <G>
                <Path
                  d="M463.401,295.455H90.909c-1.122,0-2.146,0.422-3.197,0.738l-9.156-30.086C75.645,256.539,66.819,250,56.818,250H11.364
				C5.088,250,0,255.088,0,261.364v22.727c0,6.276,5.088,11.364,11.364,11.364h28.62l71.001,233.32l-26.518,30.937
				c-10.481,12.227-15.2,29.074-10.376,44.438c6.169,19.65,23.512,32.213,43.507,32.213h325.583c6.276,0,11.364-5.088,11.364-11.364
				v-22.727c0-6.276-5.088-11.364-11.364-11.364H117.598l36.022-42.025c0.906-1.057,1.571-2.25,2.259-3.43h220.209
				c17.613,0,33.642-10.172,41.142-26.108l79.298-168.505c2.274-4.85,3.473-10.231,3.473-15.57v-3.218
				C500,311.841,483.614,295.455,463.401,295.455z"
                />
                <Circle cx="136.364" cy="704.546" r="45.455" />
                <Circle cx="409.091" cy="704.546" r="45.455" />
             </G>
           </G>
         </G>
        </Svg>
      </View>
    );
  }
}
