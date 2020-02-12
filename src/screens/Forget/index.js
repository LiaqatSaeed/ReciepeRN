import React, {Component} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Container, Text, Item, Input, Content, Button} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/AntDesign';
import CommonStyles, {
  DynamicP,
  DynamicFntW,
  DynamicM,
  DynamicBgColor,
} from '../../components/Styles';
import EmailIcon from '../../assets/Icons/emailSVG';
import PasswordIcon from '../../assets/Icons/passwordSVG';
import {connect} from 'react-redux';
import CInput from '../../components/KeyBoard';
import {
  CLogo,
  validateEmail,
  CAlert,
  LoadingButton,
  CLoader,
} from '../../components/Utilities';
import {doForget} from '../../actions/AcctountActions';

class Forget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Size: 80,
      keyboardVisible: true,
      email: '',
      password: '',
      submitting: true,
    };
  }



  animateLogo = val => {
    this.setState({
      keyboardVisible: !val,
    });
  };
  credentialValidation = val => {
    
    !validateEmail(this.state.email)
      ? CAlert({
          title: 'Email validation Error',
          message: 'Your email address is invalid',
          buttons: [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        })
      : this.setState(
          {
            submitting: false,
          },
          () => {
            this.submit();
          },
        );
  };

  submit = val => {
    
    this.props
      .doForget(this.state.email)
      .then(res => {
        this.setState(
          {
            submitting: true,
          },
          () => {
            res.type === 'SUCCESS'
              ? res.data.status === true
                ? this.navigation.navigate('SignIn')
                : this._failedLogin()
              : this._failedLogin();
          },
        );
      })
      .catch(err => {
        this.setState(
          {
            submitting: true,
          },
          () => {
            CAlert({
              title: 'Opss',
              message: 'Something bad happened. Please contact admin',
              buttons: [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            });
          },
        );
      });
  };

  _failedLogin = () =>
    CAlert({
      title: 'Validation Error',
      message: 'Email Address Not Present',
      buttons: [{text: 'OK', onPress: () => console.log('OK Pressed')}],
    });

  _onChangeText = val => {
    //val = val.match(/.{1,3}/g).join('-');
    val.length < 10
      ? this.setState({
          PhoneNumber: val,
        })
      : null;
  };

  _UpdateEmail = val => {
    this.setState({email: val});
  };

  render() {
    return (
      <Container
        style={[
          DynamicP(0, 0, 0, 0),
          DynamicBgColor(6),
          {
            justifyContent: 'space-between',
            backgroundColor: '#3E83FF',
          },
          this.state.loading === true ? CommonStyles.vhc : {},
        ]}>
        {this.state.loading ? (
          <CLoader color="white" />
        ) : (
          <>
            <View
              style={[
                {
                  backgroundColor: '#0F3871',
                  flex: 7,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                },
                CommonStyles.vhc,
                DynamicP(20, 20, 20, 20),
              ]}>
              {/* <View style={[{flex: 2}, CommonStyles.vchb]}>
          <CLogo height={85} width={120}/>
          </View> */}
              <View style={[{flex: 10}, CommonStyles.vhc]}>
                <CLogo
                  height={!this.state.keyboardVisible ? 85 : 35}
                  width={120}
                />
                <Text
                  style={[
                    CommonStyles.textCenter,
                    DynamicFntW('700'),
                    DynamicM(10, 10, 0, 0),
                    CommonStyles.white,
                    CommonStyles.uppercase,
                  ]}>
                  Forget Password?
                </Text>
                <View style={[{flexDirection: 'row', flexWrap: 'wrap'}]}>
                  <Content>
                    <Item
                      fixedLabel
                      style={[DynamicM(5, 5, 0, 0), CommonStyles.stdInput]}>
                      <Col size={2}>
                        <EmailIcon size={20} color={'#A6BCD0'} />
                      </Col>
                      <Col size={8}>
                        <CInput
                          placeholderTextColor={'#A6BCD0'}
                          placeholder="Email"
                          disabled={!this.state.submitting}
                          KeyboardCallback={val => this.animateLogo(val)}
                          onSubmitEditing={val => this._UpdateEmail(val)}
                        />
                      </Col>
                    </Item>
                  </Content>
                </View>
              </View>

              <LoadingButton
                isBlock={true}
                submitting={this.state.submitting}
                rounded={true}
                loaderColor={'white'}
                btnText={'Submit'}
                style={[DynamicM(20, 10, 0, 0), {backgroundColor: '#377CE1'}]}
                callback={() => this.credentialValidation()}
              />
              {/* <Button
            onPress={() => this.credentialValidation()}
            block
            rounded
            style={[DynamicM(20, 10, 0, 0), {backgroundColor: '#377CE1'}]}>
            <Icon name="arrowright" size={15} color="white" />
            <Text style={CommonStyles.uppercase}>Sign In</Text>
          </Button> */}
            </View>

            <View
              style={[
                CommonStyles.col,
                CommonStyles.vhc,
                {
                  flex: 1,
                },
              ]}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignIn')}>
                <Text
                  style={[
                    CommonStyles.textCenter,
                    DynamicFntW('700'),
                    CommonStyles.uppercase,
                    CommonStyles.white,
                  ]}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  doForget: email => dispatch(doForget(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Forget);
