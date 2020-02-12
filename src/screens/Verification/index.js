import React, {Component} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Container, Text, Icon, Item, Button, Content} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {connect} from 'react-redux';
import CommonStyles, {
  DynamicP,
  DynamicFntW,
  DynamicM,
  DynamicBgColor,
  DynamicBDRadius,
} from '../../components/Styles';
import {CLogo, validateEmail, CAlert} from '../../components/Utilities';
import {getUserToken, saveUserToken} from '../../actions/AsyncStorage';
import {doVerify} from '../../actions/AcctountActions';
import OTPInputView from '@twotalltotems/react-native-otp-input';

class Verification extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      Size: 80,
    };
    this;
  }
  animateLogo = val => {
    this.setState({
      Size: val ? 40 : 80,
    });
  };

  _doVerify = props => {
    this.props
      .doVerify()
      .then(res => {
        res.type === 'SUCCESS'
          ? res.data.status === true
            ? CAlert({
                title: 'Success',
                message: 'You have successfully verify your account',
                buttons: [
                  {
                    text: 'OK',
                    onPress: () => this.props.navigation.navigate('Dashboard'),
                  },
                ],
              })
            : this._invalidCodeMsg()
          : this._invalidCodeMsg();
      })
      .catch(err => {});
  };

  _invalidCodeMsg = () => {
    CAlert({
      title: 'Error',
      message: 'Your Code is Invalid, Click Resend to get new',
      buttons: [
        {
          text: 'Resend',
          onPress: () => {},
        },
        {
          text: 'OK',
          onPress: () => {},
        },
      ],
    });
  };

  _getUserToken = async () => {
    await this.props
      .getUserToken()
      .then(res => {
        res.Info.SMSVerified = 'True';
        this.props
          .saveUserToken(res.Info)
          .then(res => {
            this.props.navigation.navigate('Dashboard');
          })
          .catch(err => {});
      })
      .catch(err => {});
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
        ]}>
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
          <View style={[{flex: 3}, CommonStyles.vchb]}>
            <CLogo height={100} width={100} />
          </View>

          <View style={[{flex: 8}, CommonStyles.vthc]}>
            <Text
              style={[
                CommonStyles.textCenter,
                DynamicFntW('700'),
                DynamicM(10, 60, 0, 0),
                CommonStyles.white,
                CommonStyles.uppercase,
              ]}>
              Verification
            </Text>

            <View style={[{flexDirection: 'row', flexWrap: 'wrap'}]}>
              <Content>
                <Item
                  fixedLabel
                  style={[
                    DynamicM(5, 5, 0, 0),
                    CommonStyles.vhc,
                    {borderBottomColor: 'transparent'},
                  ]}>
                  <OTPInputView
                    style={{width: '80%', height: 70}}
                    pinCount={6}
                    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                    // onCodeChanged = {code => { this.setState({code})}}
                    autoFocusOnLoad
                    codeInputFieldStyle={[CommonStyles.stdInput]}
                    codeInputHighlightStyle={{
                      borderWidth: 2,
                      borderColor: 'red',
                    }}
                    onCodeFilled={code => {
                      code === this.props.User.VerificationCode
                        ? this._doVerify()
                        : CAlert({
                            title: 'Invalid OTP',
                            message: 'Please enter a valid 6 digits OTP',
                            buttons: [
                              {
                                text: 'OK',
                                onPress: () => console.log('OK Pressed'),
                              },
                            ],
                          });
                    }}
                  />
                </Item>
              </Content>
            </View>
          </View>
        </View>

        <View
          style={[
            CommonStyles.col,
            CommonStyles.vhc,
            {
              flex: 1,
            },
          ]}></View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  User: state.User.UserInfo,
});

const mapDispatchToProps = dispatch => ({
  doVerify: () => dispatch(doVerify()),
  getUserToken: () => dispatch(getUserToken()),
  saveUserToken: data => dispatch(saveUserToken(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Verification);
