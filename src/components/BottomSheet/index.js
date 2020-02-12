// import React from 'react';
// import {Dimensions, Text} from 'react-native';
// import RBSheet from 'react-native-raw-bottom-sheet';
// import {Button} from 'native-base';
// const BannerWidth = Dimensions.get('window').width;
// const BannerHeight = 200;

// const CBSheet = props => {
//   return (
//     <>
//       <Button
//         style={{alignSelf: 'baseline'}}
//         onPress={() => {
//           this.RBSheet.open();
//         }}>
//         <Text>Add to card</Text>
//       </Button>
//       <RBSheet
//         ref={ref => {
//           this.RBSheet = ref;
//         }}
//         height={300}
//         duration={250}
//         customStyles={{
//           container: {
//             justifyContent: 'center',
//             alignItems: 'center',
//           },
//         }}>
//           {props.children}
//         </RBSheet>
//     </>
//   );
// };

import React, {Component} from 'react';
import {View} from 'react-native';
import {Button, Text} from 'native-base';
import RBSheet from 'react-native-raw-bottom-sheet';

class CBSheet extends Component {
  _closeSheet = () => {
    
    this.RBSheet.close();
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Button
          style={{backgroundColor: '#3E83FF'}}
          title={this.props.btnText}
          onPress={() => {
            this.RBSheet.open();
            this.props.callback(this._closeSheet);
          }}>
          <Text>{this.props.btnText}</Text>
        </Button>
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          closeOnDragDown={true}
          duration={250}
          animationType={'slide'}
          customStyles={{
            container: {
              paddingLeft: 15,
              paddingRight: 15,
              alignItems: 'center',
            },
          }}>
          {this.props.children}
        </RBSheet>
      </View>
    );
  }
}

export {CBSheet};
