//region References
import React, {Component} from 'react';
import {TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import {
  Header,
  Icon,
  Left,
  Body,
  Right,
  Title,
  Button,
  Subtitle,
} from 'native-base';
import {connect} from 'react-redux';
import CommonStyles, {
  DynamicP,
  DynamicFntW,
  DynamicM,
  DynamicBgColor,
  DynamicHeight,
  DynamicBDRadius,
  DynamicBorderPosition,
} from '../../components/Styles';
import Menu from '../../assets/Icons/menuSVG';
import CartSvg from '../../assets/Icons/cartSVG';
import {getcart} from '../../actions/CartActions';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {
  getWishList
} from '../../actions/ProductActions';

import {
  getSettings
} from '../../actions/CommonActions';
//endregion

class MasterHeader extends Component {
  constructor(props) {
    super(props);
  }

  _getcart = () => {
    
    this.props
      .getcart()
      .then(res => {
        
        this.props.openCart()
      })
      .catch(err => {});
  };

  _getWishList = () => {
    
    this.props
      .getWishList()
      .then(res => {
        
        this.props.openWishlist()
      })
      .catch(err => {});
  };

  _getSettings = () => {
    this.props
      .getSettings()
      .then(res => {
        this.props.openContact();
      })
      .catch(err => {});
  };


  _getMenuBtnRight() {
    if (this.props.isMenuRight) {
      return (
        <TouchableOpacity
          transparent
          style={CommonStyles.backbtn}
          onPress={this.props.OpenMenu}
          background={TouchableNativeFeedback.Ripple(
            'rgba(0, 112, 210, 0.8)',
            true,
          )}>
          {/* <Icon name='menu' /> */}
          <Menu size={18} color={'#A6BCD0'} color1={'white'} />
        </TouchableOpacity>
      );
    }
  }

  _getMenuBtn() {
    if (this.props.isMenu) {
      return (
        <TouchableOpacity
          transparent
          style={CommonStyles.backbtn}
          onPress={this.props.OpenMenu}
          background={TouchableNativeFeedback.Ripple(
            'rgba(0, 112, 210, 0.8)',
            true,
          )}>
          {/* <Icon name='menu' /> */}
          <Menu size={18} color={'#A6BCD0'} color1={'white'} />
        </TouchableOpacity>
      );
    }
  }

  _getCartBtn() {
    if (this.props.isCart) {
      return (
        <TouchableOpacity
          transparent
          style={CommonStyles.backbtn}
          onPress={()=>this._getcart()}
          background={TouchableNativeFeedback.Ripple(
            'rgba(0, 112, 210, 0.8)',
            true,
          )}>
          {/* <Icon name='menu' /> */}
          <CartSvg size={18} color={'white'} />
        </TouchableOpacity>
      );
    }
  }

  _getInfoBtn() {
    if (this.props.isInfo) {
      return (
        <TouchableOpacity
          transparent
          style={CommonStyles.backbtn}
          onPress={()=>this._getSettings()}
          background={TouchableNativeFeedback.Ripple(
            'rgba(0, 112, 210, 0.8)',
            true,
          )}>
          <AntIcon name="infocirlce" size={18} color="white" />
        </TouchableOpacity>
      );
    }
  }

  _getWishListBtn() {
    
    if (this.props.isWish) {
      return (
        <TouchableOpacity
          transparent
          style={CommonStyles.backbtn}
          onPress={()=>this._getWishList()}
          background={TouchableNativeFeedback.Ripple(
            'rgba(0, 112, 210, 0.8)',
            true,
          )}>
           <AntIcon name="heart" size={20} color="white" />
          {/* <CartSvg size={18} color={'white'} /> */}
        </TouchableOpacity>
      );
    }
  }

  _getBackBtn() {
    if (this.props.isBack) {
      return (
        <Button
          transparent
          style={CommonStyles.backbtn}
          onPress={this.props.GoBack}
          background={TouchableNativeFeedback.Ripple(
            'rgba(0, 112, 210, 0.8)',
            true,
          )}>
          <Icon
            type="FontAwesome"
            name="angle-left"
            style={{fontSize: 20, fontWeight: 'bold'}}
          />
        </Button>
      );
    }
  }

  _getPowerOffBtn() {
    if (this.props.isLogout) {
      return (
        <Button
          transparent
          style={CommonStyles.backbtn}
          onPress={this.props.Logout}
          background={TouchableNativeFeedback.Ripple(
            'rgba(0, 112, 210, 0.8)',
            true,
          )}>
          <Icon type="FontAwesome" name="power-off" style={{fontSize: 16}} />
        </Button>
      );
    }
  }
  _getProfileIcon() {
    if (this.props.isProfile) {
      return (
        <Button
          transparent
          style={CommonStyles.backbtn}
          onPress={this.props.GoProfile}
          background={TouchableNativeFeedback.Ripple(
            'rgba(0, 112, 210, 0.8)',
            true,
          )}>
          <Icon type="FontAwesome" name="user" style={{fontSize: 24}} />
        </Button>
      );
    }
  }

  render() {
    var cstmStyles =
      this.props.customStyle == undefined ? {} : this.props.customStyle;
    const bgColor = '#3E83FF';
    return (
      <Header style={[{zIndex: 10, backgroundColor: bgColor}, cstmStyles]}>
        <Left style={{flex: 2}}>
          {this._getBackBtn()}
          {this._getMenuBtn()}
        </Left>
        <Body
          style={[{flex: 8, justifyContent: 'center', alignItems: 'center'}]}>
          <Title style={DynamicFntW('600')}>{this.props.Screen}</Title>
          {/* {<Subtitle>{this.props.sub}</Subtitle> } */}
        </Body>
        <Right style={[{flex: 2}]}>
          {this._getPowerOffBtn()}
          {this._getProfileIcon()}
          {this._getCartBtn()}
          {this._getWishListBtn()}
          {this._getMenuBtnRight()}
          {this._getInfoBtn()}
        </Right>
      </Header>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  getcart: () => dispatch(getcart()),
  getSettings: () => dispatch(getSettings()),
  getWishList: () => dispatch(getWishList()),
});
export default connect(mapStateToProps, mapDispatchToProps)(MasterHeader);
