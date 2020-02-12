import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  List,
  ListItem,
  Left,
  Button,
  Right,
  Image,
  Thumbnail,
  Text,
  View,
} from 'native-base';
import {DynamicM, DynamicP, DynamicFntSize, TColors} from '../Styles';
import Icon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/Foundation';
import Cart from '../../assets/Icons/cartSVG';
import {CFavourite} from '../Utilities';

const CListItem = props => {
  return (
    <ListItem
      key={props.data.CategoryID}
      onPress={props.callback}
      avatar
      style={[
        DynamicM(10, 0, 10, 10),
        DynamicP(10, 10, 10, 10),
        {backgroundColor: 'white'},
      ]}>
      {props.isImage !== false ? (
        <Thumbnail
          square
          size={80}
          source={{
            uri: props.data.Icon,
          }}
        />
      ) : null}

      <View style={[{flex: 1}, DynamicM(0, 0, 0, 10)]}>
        <Text style={{flex: 1}}>{props.data.Name}</Text>
        <Text note style={{flex: 1}}>
          {props.data.Details}
        </Text>
      </View>
      <Icon name="right" size={15} color="black" />
    </ListItem>
  );
};

const CProductListItem = props => {
  return (
    <ListItem
      key={props.data.CategoryID}
      avatar
      style={[
        DynamicM(10, 0, 10, 10),
        DynamicP(10, 10, 10, 10),
        {backgroundColor: 'white'},
      ]}>
      <Thumbnail
        square
        size={80}
        source={{
          uri: props.data.ImageURL_Thumb,
        }}
      />
      <View style={[{flex: 5}, DynamicM(0, 0, 0, 10)]}>
        <TouchableOpacity onPress={props.viewDetails}>
          <Text style={{flex: 1}} numberOfLines={2}>
            {props.data.Name}
          </Text>
        </TouchableOpacity>

        <Text note style={{flex: 1}}>
          {`${props.data.CategoryName} - ${props.data.SubCategoryName}`}
        </Text>
        <View
          style={[
            DynamicP(0, 0, 10, 10),
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          ]}>
          {/* <Button transparent>
            <Cart size={20} color={'#377CE1'} />
          </Button> */}
          <Text style={{color: '#2e2e2e', fontWeight: '700'}}>
            £{props.data.SellingPrice}
          </Text>
        </View>
      </View>
      <View
        style={[
          {
            flex: 2,
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'stretch',
          },
          DynamicM(0, 0, 0, 10),
        ]}>
        <CFavourite
          isFav={props.data.IsWishlist}
          callback={isFav => props.makeFav(isFav)}
        />
        <TouchableOpacity
          onPress={props.callback}
          style={[
            {backgroundColor: '#3E83FF', borderRadius: 3},
            DynamicP(5, 5, 10, 10),
          ]}>
          <Text
            style={[
              DynamicFntSize(12),
              DynamicP(0, 0, 0, 0),
              {textAlign: 'center', color: 'white'},
            ]}>
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </ListItem>
  );
};

const CCartItem = props => {
  return (
    <ListItem
      key={props.data.CategoryID}
      avatar
      style={[
        DynamicM(10, 0, 10, 10),
        DynamicP(10, 10, 10, 10),
        {backgroundColor: 'white'},
      ]}>
      <Thumbnail
        square
        size={80}
        source={{
          uri: props.data.ImageURL_Thumb,
        }}
      />
      <View style={[{flex: 5}, DynamicM(0, 0, 0, 10)]}>
        <TouchableOpacity onPress={props.viewDetails}>
          <Text style={{flex: 1}} numberOfLines={2}>
            {props.data.Name}
          </Text>
        </TouchableOpacity>
        <Text note style={{flex: 1}}>
          {props.data.SubCategoryName}
        </Text>
        <View
          style={[
            DynamicP(0, 0, 10, 10),
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          ]}>
          <Text style={{color: '#2e2e2e', fontWeight: '700'}}>
            QTY:{' '}
            <Text style={{color: '#2e2e2e', fontWeight: 'normal'}}>
              {props.data.Quantity}
            </Text>
          </Text>
          {/* <Button transparent>
            <Cart size={20} color={'#377CE1'} />
          </Button> */}
        </View>
      </View>
      <View
        style={[
          {
            flex: 2,
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            alignSelf: 'stretch',
          },
          DynamicM(0, 0, 0, 10),
        ]}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={props.removeCart}
            style={[
              {backgroundColor: 'transparent', borderRadius: 3},
              DynamicP(5, 5, 5, 5),
            ]}>
            <Icon name="delete" size={20} color="red" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={props.callback}
            style={[
              {backgroundColor: 'transparent', borderRadius: 3},
              DynamicP(5, 5, 5, 5),
            ]}>
            <FIcon name="pencil" size={20} color={TColors.bgSecondary} />
          </TouchableOpacity>
        </View>

        <Text style={{color: '#2e2e2e', fontWeight: '700'}}>
          £{parseFloat(props.data.Quantity * props.data.Rate).toFixed(2)}
        </Text>
      </View>
    </ListItem>
  );
};

export {CListItem, CProductListItem, CCartItem};
