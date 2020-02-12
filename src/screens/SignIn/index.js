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
import {doLogin} from '../../actions/AcctountActions';
import {saveUserToken, getUserToken} from '../../actions/AsyncStorage';
import {getSettings} from '../../actions/CommonActions';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Size: 80,
      keyboardVisible: true,
      email: '',
      password: '',
      loading: true,
      submitting: true,
    };
  }

  async UNSAFE_componentWillMount() {
    await this._getSettings();
    await this.props
      .getUserToken()
      .then(res => {
        res !== undefined
          ? res.Info.SMSVerified == 'False'
            ? this.props.navigation.navigate('Verification')
            : this.props.navigation.navigate('Dashboard')
          : this.setState({loading: false});
      })
      .catch(err => {});
  }

  _getSettings = () => {
    this.props
      .getSettings()
      .then(res => {
        console.log(res)
      })
      .catch(err => {});
  };

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
      .doLogin(this.state.email, this.state.password)
      .then(res => {
        this.setState(
          {
            submitting: true,
          },
          () => {
            res.type === 'SUCCESS'
              ? this.props
                  .saveUserToken(res.data)
                  .then(resj => {
                    
                    res.data.SMSVerified == 'False'
                      ? this.props.navigation.navigate('Verification')
                      : this.props.navigation.navigate('Dashboard');
                  })
                  .catch(error => this._failedLogin())
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
      message: 'Invalid Username Password',
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
              <View
                style={[{flex: 10, alignSelf: 'stretch'}, CommonStyles.vhc]}>
                <View style={[CommonStyles.vbhc, {flex: 8}]}>
                  <CLogo
                    height={this.state.keyboardVisible ? 85 : 35}
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
                    Sign In
                  </Text>
                </View>

                <View
                  style={[
                    {
                      flex: 8,
                      flexDirection: 'row',
                      alignSelf: 'stretch',
                      flexWrap: 'wrap',
                    },
                  ]}>
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
                    <Item
                      fixedLabel
                      style={[DynamicM(5, 5, 0, 0), CommonStyles.stdInput]}>
                      <Col size={2}>
                        <PasswordIcon size={20} color={'#A6BCD0'} />
                      </Col>
                      <Col size={8}>
                        <CInput
                          placeholderTextColor={'#A6BCD0'}
                          placeholder="Password"
                          security={true}
                          disabled={!this.state.submitting}
                          KeyboardCallback={val => this.animateLogo(val)}
                          onSubmitEditing={val =>
                            this.setState({password: val})
                          }
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
                btnText={'Sign In'}
                style={[DynamicM(20, 10, 0, 0), {backgroundColor: '#377CE1'}]}
                callback={() => this.credentialValidation()}
              />
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Forget')}>
                <Text
                  style={[
                    CommonStyles.textCenter,
                    DynamicFntW('700'),
                    CommonStyles.uppercase,
                    {fontSize: 12},
                    CommonStyles.white,
                  ]}>
                  Forgot Password ?
                </Text>
              </TouchableOpacity>
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
              <Text style={{fontSize: 12, color: 'white'}}>
                Don't Have an Account?
              </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignUp')}>
                <Text
                  style={[
                    CommonStyles.textCenter,
                    DynamicFntW('700'),
                    CommonStyles.uppercase,
                    CommonStyles.white,
                  ]}>
                  Create Account
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings.info
});

const mapDispatchToProps = dispatch => ({
  saveUserToken: response => dispatch(saveUserToken(response)),
  doLogin: (email, Password) => dispatch(doLogin(email, Password)),
  getUserToken: () => dispatch(getUserToken()),
  getSettings: () => dispatch(getSettings()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
