import React from 'react';
import Carousel from 'react-native-banner-carousel';
import {StyleSheet, Image, View, Dimensions} from 'react-native';
import {CCard} from '../Card';
import CommonStyle from '../Styles';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 200;

const CCarousel = props => {
  
  return (
    <Carousel
      autoplay
      autoplayTimeout={4000}
      loop
      index={0}
      showsPageIndicator={false}
      pageSize={BannerWidth}>
      {props.list.map((item, index) =>
        item.Quantity !== 0 ? (
          <CCard
            Imagestyle={{width: BannerWidth, height: BannerHeight}}
            style={CommonStyle.noShadow}
            quantity={item.Quantity}
            item={item}
            isAdd={true}
            keyItem={item.ProductID}
            play={props.play}
            makeFav={isfav => props.makeFav(isfav, item.ProductID)}
            callback={() =>
              props.callback !== undefined ? props.callback(item.ProductID, true) : {}
            }
            viewDetails={() =>
              props.callback !== undefined ? props.callback(item.ProductID, false) : {}
            }
          />
        ) : null,
      )}
    </Carousel>
  );
};

export {CCarousel};
