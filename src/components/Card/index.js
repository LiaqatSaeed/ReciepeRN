import React, {Component} from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import {
  Card,
  CardItem,
  Text,
  Button,
  Left,
  Body,
  Right,
  Separator,
  Row,
} from 'native-base';
import Cart from '../../assets/Icons/cartSVG';
import Ribbon from '../../assets/Icons/ribbonSVG';
import Icon from 'react-native-vector-icons/AntDesign';
import CommonStyles, {DynamicM, DynamicP, DynamicFntSize} from '../Styles';
import {CTag, CFavourite} from '../Utilities';
//Button
const CCard = props => {
  return (
   
      <Card
      key={props.keyItem}
        style={[
          CommonStyles.noShadow,
          {flex: 1, overflow: 'hidden'},
          DynamicM(0, 0, 0, 0),
        ]}>
        <CardItem
          style={{
            flexDirection: 'row',
            justifyContent: props.quantity > 0 ? 'space-between' : 'flex-end',
          }}>
          {props.quantity > 0 ? (
            <Left
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                paddingLeft: 16,
              }}>
              <Ribbon
                width={350}
                style={{top: -10}}
                height={35}
                text={props.quantity}
                color={'#f65d31'}
              />
              {/* <CTag quantity={props.quantity} text="on Sale" bgColor={'red'} /> */}
            </Left>
          ) : null}
          <Right>
            <CFavourite
              play={props.play}
              keyItem={props.keyItem}
              isFav={props.item.IsWishlist}
              callback={isFav => props.makeFav(isFav)}
            />
          </Right>
        </CardItem>
        <TouchableOpacity key={props.keyItem} onPress={props.callback}>
        <CardItem
          cardBody
          style={[
            CommonStyles.vhc,
            props.Imagestyle != undefined ? props.Imagestyle : {},
            {paddingTop: 40},
          ]}>
          <Image
            resizeMode={'contain'}
            source={{
              uri: props.item.ImageURL_Thumb,
            }}
            style={{height: 150, width: 150}}
          />
        </CardItem>
        </TouchableOpacity>
        <CardItem>
          <Left>
            <Body>
            <TouchableOpacity key={props.keyItem} onPress={props.callback}>
              <Text
                numberOfLines={1}
                style={{color: '#2e2e2e', fontWeight: '700'}}>
                {props.item.Name}
              </Text>
             </TouchableOpacity>
              <View style={[{flexDirection: 'row'}]}>
                <Text style={{color: '#2e2e2e', fontWeight: '700'}}>
                  £
                  {props.item.DiscountPrice > 0
                    ? props.item.DiscountPrice
                    : props.item.SellingPrice}
                </Text>
                {props.item.DiscountPrice > 0 ? (
                  <Text
                    style={[
                      {
                        color: 'red',
                        fontWeight: '700',
                        textDecorationColor: 'blue',
                        textDecorationLine: 'line-through',
                        paddingLeft: 10,
                      },
                      DynamicM(0, 0, 0, 2),
                    ]}>
                    £{props.item.SellingPrice}
                  </Text>
                ) : null}
              </View>
            </Body>
          </Left>
          {props.isAdd !== false ? (
          <Right>
            <TouchableOpacity
              onPress={props.viewDetails}
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
          </Right>
        ) : null}
        </CardItem>
      </Card>
   
  );
};

const CBreadCrumb = props => {
  return (
    <Separator
      style={[
        {
          flexDirection: 'row',
          padding: 10,
          height: 'auto',
          borderBottomColor: '#c5c5c5',
          borderBottomWidth: 1,
          justifyContent: 'center',
        },
        props.style !== undefined ? props.style : {},
      ]}>
      {props.left !== false ? (
        <CardItem
          style={[DynamicM(0, 0, 0, 0), DynamicP(0, 0, 0, 0), {flex: 2}]}>
          <Left>
            <Body style={{flex: 1, justifyContent: 'flex-start'}}>
              <Text
                style={[CommonStyles.cardTitle, CommonStyles.uppercase]}
                numberOfLines={1}>
                {props.text}
              </Text>
              {/* <Text
                style={[CommonStyles.cardSubTitle, CommonStyles.uppercase]}
                numberOfLines={1}>
                <Text
                  style={[CommonStyles.cardSubTitle, CommonStyles.uppercase]}
                  numberOfLines={1}>
                  {props.text}
                </Text>
                <Text
                  style={[CommonStyles.cardSubTitle, CommonStyles.uppercase]}
                  numberOfLines={1}>
                  {props.text}
                </Text>
                <Text
                  style={[CommonStyles.cardSubTitle, CommonStyles.uppercase]}
                  numberOfLines={1}>
                  {props.text}
                </Text>
              </Text>
             */}
            </Body>
          </Left>
          {props.right !== false ? (
            <Right>
              <Button transparent>
                <Text>View All</Text>
                <Icon name="right" size={15} color="black" />
              </Button>
            </Right>
          ) : null}
        </CardItem>
      ) : (
        <Text
          style={{
            fontSize: 18,
            textTransform: 'uppercase',
            fontWeight: '700',
            color: props.color,
          }}
          numberOfLines={1}>
          {props.text}
        </Text>
      )}
    </Separator>
  );
};
//Product card
const CPCard = props => {
  return (
    <TouchableOpacity
      onPress={() => {}}>
      <CardItem
        style={{
          flexDirection: 'row',
          justifyContent: props.quantity > 0 ? 'space-between' : 'flex-end',
        }}>
        {props.quantity > 0 ? (
          <Left
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              paddingLeft: 16,
            }}>
            <Ribbon
              width={350}
              style={{top: -10}}
              height={35}
              text={props.quantity}
              color={'#f65d31'}
            />

            {/* <CTag quantity={props.quantity} text="on Sale" bgColor={'red'} /> */}
          </Left>
        ) : null}
        <Right>
          <CFavourite
            isFav={props.item.IsWishlist}
            callback={isFav => props.makeFav(isFav)}
          />
        </Right>
      </CardItem>
      <CardItem
        cardBody
        style={[
          CommonStyles.vhc,
          props.Imagestyle != undefined ? props.Imagestyle : {},
        ]}>
        <Image
          resizeMode={'contain'}
          source={{
            uri: props.item.ImageURL_Thumb,
          }}
          style={{height: 150, width: 150}}
        />
      </CardItem>
      <CardItem>
        <Left>
          <Body>
            <Text style={{color: '#2e2e2e', fontWeight: '700'}}>
              {props.item.Name}
            </Text>
            <View style={[{flexDirection: 'row'}]}>
              <Text style={{color: '#2e2e2e', fontWeight: '700'}}>
                £
                {props.item.DiscountPrice > 0
                  ? props.item.DiscountPrice
                  : props.item.SellingPrice}
              </Text>
              {props.item.DiscountPrice > 0 ? (
                <Text
                  style={[
                    {
                      color: 'red',
                      fontWeight: '700',
                      textDecorationColor: 'blue',
                      textDecorationLine: 'line-through',
                      paddingLeft: 10,
                    },
                    DynamicM(0, 0, 0, 2),
                  ]}>
                  £{props.item.SellingPrice}
                </Text>
              ) : null}
            </View>
          </Body>
        </Left>
        {props.isAdd !== false ? (
          <Right>
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
          </Right>
        ) : null}
      </CardItem>
    </TouchableOpacity>
  );
};

// const CBreadCrumb = props => {

//   return (
//     <Card style={{}}>
//       <CardItem
//         style={[{
//           justifyContent: 'center',
//           alignItems: 'center',
//         },props.style != undefined ? props.style :{}]}>
//         <Text
//           style={{fontSize: 18,textTransform:'uppercase', fontWeight: '700', color: props.color}}
//           numberOfLines={1}>
//           {props.text}
//         </Text>
//       </CardItem>
//     </Card>
//   );
// };

export {CCard, CBreadCrumb, CPCard};
