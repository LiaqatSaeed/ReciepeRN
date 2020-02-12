import React, {Component} from 'react';
import {
  TouchableOpacity,
  Alert,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Button, Text, Item, Label, Input, Footer, FooterTab} from 'native-base';
import CommonStyles, {
  DynamicBgColor,
  DynamicTColor,
  DynamicFntW,
  DynamicP,
  DynamicM,
  DynamicHeight,
  DynamicBorderColor,
  DynamicBDRadius,
  TColors,
} from '../Styles';
import {CGradient} from '../Gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/FontAwesome';
//Button
const CButton = props => (
  <Button
    rounded
    block={props.block != undefined ? true : false}
    onPress={() => props.callback()}
    style={[
      DynamicP(0, 0, 0, 0),
      DynamicHeight(props.height),
      DynamicBDRadius(props.radius),
      CommonStyles.noShadow,
      props.bdColor !== undefined ? DynamicBorderColor(props.bdColor) : null,
      props.bgColor !== undefined
        ? DynamicBgColor(props.bgColor)
        : DynamicBgColor(),
      {
        alignSelf: 'center',
      },
      props.style !== undefined ? props.style : {},
    ]}>
    <Text
      style={[
        {
          textTransform: 'capitalize',
        },
        DynamicM(0, 0, 5, 5),
        props.color !== undefined ? DynamicTColor(props.color) : null,
        DynamicFntW('600'),
      ]}>
      {props.text}
    </Text>
  </Button>
);

const GradientBtn = props => (
  <View style={{borderRadius: 20}}>
    <CGradient
      locations={[0, 0.5, 1]}
      end={{x: 0.7, y: 5}}
      start={{x: 0.0, y: 0.15}}
      colors={['#30C7B2', '#30C7B2', '#3AD29F']}>
      {props.children}
    </CGradient>
  </View>
);

const CLogo = props => (
  <Image
    source={require('../../assets/logo/logo1.png')}
    style={{height: props.height, width: props.width}}
    resizeMode="contain"
  />
);

const CFItem = props => (
  <Item
    style={{alignSelf: 'stretch'}}
    stackedLabel={props.isStack === undefined ? true : props.isStack}>
    {props.label !== undefined ? (
      <Label style={{fontWeight: '700', textTransform: 'uppercase'}}>
        {props.label}
      </Label>
    ) : null}
    {props.value !== undefined ? (
      <Input style={CommonStyles.textColor} disabled value={props.value} />
    ) : (
      props.item
    )}
  </Item>
);

const CFooter = props => {
  return (
    <Footer>
      <FooterTab style={{backgroundColor: TColors.bgSecondary}}>
        {props.footerMeta.map(obj => (
          <Button vertical onPress={obj.callback}>
            {obj.iconType !== 'FontAwesome' ? (
              <Icon
                type="FontAwesome"
                name={obj.icon}
                style={{color: 'white'}}
              />
            ) : (
              <FIcon
                type="FontAwesome"
                name={obj.icon}
                style={{color: 'white'}}
              />
            )}

            <Text style={{color: 'white'}}>{obj.text}</Text>
          </Button>
        ))}
      </FooterTab>
    </Footer>
  );
};

const validateEmail = val =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val);

const validatePassword = val =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(val);

const CAlert = props =>
  Alert.alert(props.title, props.message, props.buttons, {cancelable: false});

const LoadingButton = props => {
  return (
    <Button
      block={props.isBlock}
      rounded={props.rounded}
      style={props.style}
      onPress={props.callback}>
      {!props.submitting ? (
        <ActivityIndicator size="small" color={props.loaderColor} />
      ) : null}
      <Text style={CommonStyles.BtnTxt}>
        {!props.submitting ? `Submitting` : `${props.btnText}`}
      </Text>
    </Button>
  );
};

const CCBtn = props => (
  <TouchableOpacity
    style={[
      CommonStyles.vhc,
      {backgroundColor: 'red', width: '100%'},
      props.style !== undefined ? props.style : null,
    ]}
    onPress={() => props.callback()}>
    {props.children}
  </TouchableOpacity>
);

const CLoader = props => (
  <ActivityIndicator
    size={props.size === undefined ? 'large' : props.size}
    style={DynamicM(20, 0, 0, 0)}
    color={props.color !== undefined ? props.color : '#3E83FF'}
  />
);

const CTag = props => (
  <Text
    style={[
      {backgroundColor: props.bgColor, alignSelf: 'baseline', color: 'white'},
      DynamicP(5, 5, 5, 5),
      DynamicM(0, 10, 0, 0),
    ]}>
    <Text style={{color: 'white'}}>{props.text}</Text>
    <Text
      style={{
        paddingLeft: 10,
        color: 'white',
        fontSize: 14,
      }}>{`(${props.quantity} left)`}</Text>
  </Text>
);

const CFavourite = props => {
  // return props.play !== props.keyItem ? (
  return props.isFav === 0 ? (
    <TouchableOpacity onPress={() => props.callback(true)}>
      <Icon name="hearto" size={20} color="#ed5565" />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={() => props.callback(false)}>
      <Icon name="heart" size={20} color="#ed5565" />
    </TouchableOpacity>
  );
  // ) : (
  //   <CLoader color="#ed5565" size="small" />
  // );
};

const NoData = props => (
  <View style={[{flex: 1}, CommonStyles.vhc]}>
    <Text style={{fontSize: 14, fontWeight: '700'}}>{props.text}</Text>
  </View>
);
export {
  GradientBtn,
  CButton,
  CAlert,
  CLogo,
  CFooter,
  validateEmail,
  validatePassword,
  CFItem,
  LoadingButton,
  CLoader,
  CCBtn,
  CTag,
  CFavourite,
  NoData,
};
