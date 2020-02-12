import React, {Component} from 'react';
import {Image, View, ImageBackground, Dimensions, Alert} from 'react-native';
import {
  Text,
  Container,
  List,
  Left,
  Body,
  Right,
  ListItem,
  Content,
  Icon,
} from 'native-base';
import {connect} from 'react-redux';
import DrawerMeta from '../Sidebar/DrawerMeta';
import Collection from '../../assets/Icons/collectionSVG.js';
import Products from '../../assets/Icons/productSVG.js';
import Orders from '../../assets/Icons/orderSVG.js';
import Exit from '../../assets/Icons/exitSVG';
import Logout from '../../assets/Icons/poweroffSVG';
import User from '../../assets/Icons/userSVG';
import WhishList from '../../assets/Icons/wishlistSVG';
import Cart from '../../assets/Icons/cartSVG';
import Settings from '../../assets/Icons/settingSVG';
import Contact from '../../assets/Icons/nameSVG';

import {TouchableOpacity} from 'react-native-gesture-handler';
import UserImg from '../ThumbNail';
import {getWishList, getProducts} from '../../actions/ProductActions';

import CommonStyles, {DynamicFntW} from '../../components/Styles';
import {removeUserToken} from '../../actions/AsyncStorage';
import {getSettings} from '../../actions/CommonActions';
const deviceWidth = Dimensions.get('window').width;
const pLeft = deviceWidth > 480 ? 15 : 15;

class SideBar extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showAlert: false,
      theme: '',
      title: '',
      subtitle: '',
      btn1Text: '',
      bgColor: '#0F3871',
    };
  }

  _checkDrawer = (Obje, index) => {
    
    switch (index) {
      case 1:
        this._getProducts(Obje);
        break;
      case 3:
        this._getWishList(Obje);
        break;
      case 7:
        this._getSettings(Obje);
        break;
      case 8:
        this.Logout();
        break;

      default:
        this._navigation(Obje);
        break;
    }
  };
  _getWishList = obje => {
    this.props
      .getWishList()
      .then(res => {
        this._navigation(obje);
      })
      .catch(err => {});
  };

  _getSettings = (obje) => {
    this.props
      .getSettings()
      .then(res => {
        this._navigation(obje);
      })
      .catch(err => {});
  };

  _getProducts = obje => {
    this.props
      .getProducts()
      .then(res => {
        this._navigation(obje);
      })
      .catch(err => {});
  };

  _navigation = obje => {
    
    this.props.navigation.navigate(obje.Navigation);
    this.props.navigation.closeDrawer();
  };
  _bootstrapAsync = () => {
    AsyncStorage.clear().then(() => console.log('Cleared'));
    this.props.navigation.navigate('CompanyCode');
  };
  _BGColor() {
    return (
      <View
        style={{
          width: '100%',
          height: 90,
          flex: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 10,
          backgroundColor: this.state.bgColor,
        }}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            position: 'absolute',
            alignSelf: 'flex-start',
            top: 25,
            padding: 5,
            margin: 10,
          }}>
          {this._getThumbnail(this.props.User)}
        </View>
        <View style={{position: 'absolute', alignSelf: 'center', top: 50}}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('null');
            }}>
            <Text
              style={{
                fontSize: 20,
                color: '#FFFFFF',
              }}>
              {this.props.User.FirstName} {this.props.User.LastName}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _getThumbnail(Obj) {
    return (
      <UserImg
        UserInfo={{
          FirstName: `${Obj.FirstName}`,
          LastName: `${Obj.LastName}`,
          UserImage: '',
          UserImageColor: '#377CE1',
        }}
        size={40}
      />
    );
  }

  _getSvg(SvgId) {
    switch (SvgId) {
      case 0:
        return <Collection size={25} color={this.state.bgColor} />;

      case 1:
        return <Products size={25} color={this.state.bgColor} />;

      case 2:
        return <Orders size={25} color={this.state.bgColor} />;

      case 3:
        return <WhishList size={25} color={this.state.bgColor} />;

      case 4:
        return <Cart size={25} color={this.state.bgColor} />;

      case 5:
        return <User size={25} color={this.state.bgColor} />;

      case 6:
        return <Settings size={25} color={this.state.bgColor} />;

      case 7:
        return <Contact size={25} color={this.state.bgColor} />;
      case 8:
        return <Logout size={25} color={this.state.bgColor} />;
      case 9:
        return <Exit size={25} color={this.state.bgColor} />;
      default:
        break;
    }
  }
  Logout = () => {
    // this.setState({
    //   showAlert: true,
    //   theme: "warning",
    //   title: "Logout",
    //   subTitle:
    //     "Are You sure you want to Logout By Clicking Logout Your session Will be remove",
    //   btn1Text: "Logout",
    //   actionFunction: () => this.LogoutUser()
    // });
    Alert.alert(
      'Logout',
      'Are You sure you want to Logout? By Clicking Logout Your session Will be removed ',
      [
        {
          text: 'Logout',
          onPress: () => {
            this.LogoutUser();
          },
        },
        {text: 'Cancel', onPress: () => {}},
      ],
    );
  };
  LogoutUser = () => {
    this.props
      .removeUserToken()
      .then(async () => {
        this.props.navigation.navigate('Auth');
      })
      .catch(error => {
        this.setState({error});
      });
  };

  handleClose = () => {
    this.setState({showAlert: false});
  };

  render() {
    return (
      <Container>
        {this._BGColor()}
        <Content>
          <List style={{marginTop: 90}}>
            {DrawerMeta.map((Obje, index) => {
              return (
                <ListItem
                  style={{marginLeft: 0}}
                  key={index}
                  onPress={() => {
                    this._checkDrawer(Obje, index);
                  }}>
                  <Left style={{flex: 3}}>{this._getSvg(index)}</Left>
                  <Body style={{flex: 10}}>
                    <Text style={DynamicFntW('600')}>{Obje.Text}</Text>
                  </Body>
                </ListItem>
              );
            })}
          </List>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  User: state.User.UserInfo,
  // UserData: state.User.UserInfo,
  // CmpConfigs: state.token.CmpConfigs
});

const mapDispatchToProps = dispatch => ({
  getWishList: () => dispatch(getWishList()),
  getSettings: () => dispatch(getSettings()),
  getProducts: () => dispatch(getProducts(undefined, undefined)),
  removeUserToken: () => dispatch(removeUserToken()),
  // reset: isyes => dispatch(reset(isyes))
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
