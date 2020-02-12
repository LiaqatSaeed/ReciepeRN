import React from 'react';
import {Text, View, Dimensions} from 'react-native';
import {CCard} from '../Card';
import CommonStyle from '../Styles';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 200;
import Slick from 'react-native-slick';

const CSlick = props => {
  return (
    <Slick  showsButtons={true}>
      <View style={{backgroundColor:'red'}}>
        <Text style={{color:'white'}}>Hello Slick</Text>
      </View>
      <View style={{backgroundColor:'green'}}>
        <Text style={{color:'white'}}>Beautiful</Text>
      </View>
      <View style={{backgroundColor:'blue'}}>
        <Text style={{color:'white'}}>And simple</Text>
      </View>
    </Slick>
  );
};

export {CSlick};
