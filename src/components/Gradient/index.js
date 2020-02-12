import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
//Button
const CGradient = props => {
  return (
    <LinearGradient
      start={props.start !== undefined ? props.start : {x: 0.0, y: 0.15}}
      end={props.end !== undefined ? props.end : {x: 0.2, y: 1.4}}
      locations={
        props.locations !== undefined ? props.locations : [0.05, 0.6, 0.8]
      }
      colors={props.colors}
      style={props.style !== undefined ? props.style : {}}>
      {props.children}
    </LinearGradient>
  );
};

export {CGradient};
