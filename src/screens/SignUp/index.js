import React, {Component} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {
  Container,
  Text,
  Item,
  Input,
  Content,
  Button,
  Switch,
} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFA from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CommonStyles, {
  DynamicP,
  DynamicFntW,
  DynamicM,
  DynamicBgColor,
  TColors,
} from '../../components/Styles';
import EmailIcon from '../../assets/Icons/emailSVG';
import NameIcon from '../../assets/Icons/nameSVG';
import PasswordIcon from '../../assets/Icons/passwordSVG';
import CInput from '../../components/KeyBoard';
import {connect} from 'react-redux';
import {
  CLogo,
  LoadingButton,
  CAlert,
  validateEmail,
  validatePassword,
} from '../../components/Utilities';
import {doSignUp, doLogin} from '../../actions/AcctountActions';
import {saveUserToken, getUserToken} from '../../actions/AsyncStorage';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Size: 80,
      keyboardVisible: true,
      submitting: true,
      isDatePickerVisible: false,
      DOB: '',
      Phone: '',
      Gender: true,
    };
  }

  animateLogo = val => {
    this.setState({
      keyboardVisible: !val,
    });
  };
  submit = async val => {
    var Vali = await this._validateFields();
    
    console.log(Vali);
    this.setState({submitting :false})
    Vali.indexOf('true') !== -1
      ? CAlert({
          title: 'Validation',
          message: 'Please fill the required field.',
          buttons: [{text: 'OK', onPress: () =>  this.setState({submitting :true})}],
        })
      : this._doSignUp();
  };

  _getDetails = () => {
    return {
      FirstName: this.state.FirstName,
      LastName: this.state.LastName,
      Email: this.state.Email,
      Password: this.state.Password,
      Gender: this.state.Gender === true ? 0 : 1,
      DateOfBirth: this.state.DOB,
      Phone: this.state.Phone !== undefined ? this.state.Phone : '',
      Mobile: this.state.Mobile,
      HouseNo: this.state.HouseNo,
      BuildingName:
        this.state.BuildingName !== undefined ? this.state.BuildingName : '',
      Address: this.state.Address,
      PostCode: this.state.PostCode,
    };
  };

  _doSignUp = async () => {
    var $that = this;
    var UserInfo = $that._getDetails();
    console.log(UserInfo);
    $that.props
      .doSignUp(UserInfo)
      .then(res => {
        res !== undefined ? 
        CAlert({
          title: res.data.response > 0 ? 'Success' : 'Error',
          message: res.data.status,
          buttons: [
            {
              text: 'OK',
              onPress: () =>
                res.data.response > 0 ? $that._doLogin($that) :  this.setState({submitting :true}),
            },
          ],
        }) : null;
        // $that.setState(
        //   {
        //     submitting: true,
        //   },
        //   () => {
        //     
        //     res.type === 'SUCCESS'
        //       ? $that.props
        //           .saveUserToken(res.data)
        //           .then(res => {
        //             $that.props.navigation.navigate('Verification');
        //           })
        //           .catch(error => $that._failedLogin())
        //       : $that._failedLogin();
        //   },
        // );
      })
      .catch(err => {
        $that.setState(
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

  _doLogin = async $that => {
    $that.props
      .doLogin($that.state.Email, $that.state.Password)
      .then(res => {
        $that.setState(
          {
            submitting: true,
          },
          () => {
            
            res.type === 'SUCCESS'
              ? $that.props
                  .saveUserToken(res.data)
                  .then(res => {
                    $that.props.navigation.navigate('Verification');
                  })
                  .catch(error => $that._failedLogin())
              : $that._failedLogin();
          },
        );
      })
      .catch(err => {
        $that.setState(
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

  _validateFields = () => {
    
    var validated = {
      VFname: this.state.FirstName === '' ? true : false,
      VLName: this.state.LastName === '' ? true : false,
      VEmail:
        this.state.Email === '' && !validateEmail(this.state.Email)
          ? true
          : false,
      VPassword:
        this.state.Password === '' && !validatePassword(this.state.Email)
          ? true
          : false,
      VDOB: this.state.DOB === '' ? true : false,
      VMobile: this.state.Mobile === '' ? true : false,
      VHNo: this.state.HouseNo === '' ? true : false,
      VPCode: this.state.PostCode === '' ? true : false,
      VStreet: this.state.Address === '' ? true : false,
    };

    this.setState(validated);
    return JSON.stringify(validated);
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
        <DateTimePickerModal
          isVisible={this.state.isDatePickerVisible}
          mode="date"
          value={this.state.DOB}
          onConfirm={date => {
            
            var diffDays = parseInt(
              (new Date() - date) / (1000 * 60 * 60 * 24),
              10,
            );
            diffDays > 18
              ? this.setState({
                  isDatePickerVisible: !this.state.isDatePickerVisible,
                  DOB: date.toLocaleDateString(),
                })
              : this.setState(
                  {
                    isDatePickerVisible: !this.state.isDatePickerVisible,
                  },
                  () => {
                    CAlert({
                      title: 'Validation Error',
                      message: 'Sorry! your age is less than 18',
                      buttons: [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                      ],
                    });
                  },
                );
          }}
          onCancel={() =>
            this.setState({
              isDatePickerVisible: !this.state.isDatePickerVisible,
            })
          }
        />
        <View
          style={[
            {
              backgroundColor: '#0F3871',
              flex: 7,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            },
            DynamicP(20, 20, 20, 20),
          ]}>
          <View style={[{flex: 2}, CommonStyles.vhc]}>
            <CLogo height={85} width={120} />
          </View>
          <View style={[{flex: 8}]}>
          <Text style={{fontSize: 12,marginTop:10, color: 'white'}}>
            {this.props.settings.SignUpWarningMessage}
          </Text>
            <Text
              style={[
                CommonStyles.textCenter,
                DynamicFntW('700'),
                DynamicM(10, 20, 0, 0),
                CommonStyles.white,
                CommonStyles.uppercase,
              ]}>
              Create Account
            </Text>
            <Content>
              <Item
                fixedLabel
                style={[DynamicM(5, 5, 0, 0), CommonStyles.stdInput]}>
                <Col size={2} style={CommonStyles.vhc}>
                  <Text style={{color: 'red', paddingLeft: 40}}>*</Text>
                  <NameIcon size={20} color={'#A6BCD0'} />
                </Col>
                <Col size={8}>
                  <CInput
                    style={[
                      this.state.VFname === true
                        ? {borderBottomColor: 'red', borderBottomWidth: 1}
                        : {},
                      CommonStyles.white,
                      {color: TColors.bgSecondary},
                    ]}
                    placeholderTextColor={'#A6BCD0'}
                    placeholder="Firstname"
                    KeyboardCallback={val => this.animateLogo(val)}
                    onSubmitEditing={val =>
                      this.setState({FirstName: val, VFname: false})
                    }
                  />
                </Col>
              </Item>
              <Item
                fixedLabel
                style={[DynamicM(5, 5, 0, 0), CommonStyles.stdInput]}>
                <Col size={2} style={CommonStyles.vhc}>
                  <Text style={{color: 'red', paddingLeft: 40}}>*</Text>
                  <NameIcon size={20} color={'#A6BCD0'} />
                </Col>
                <Col size={8}>
                  <CInput
                    style={[
                      this.state.VLName === true
                        ? {borderBottomColor: 'red', borderBottomWidth: 1}
                        : {},
                      CommonStyles.white,
                      {color: TColors.bgSecondary},
                    ]}
                    placeholderTextColor={'#A6BCD0'}
                    placeholder="Lastname"
                    KeyboardCallback={val => this.animateLogo(val)}
                    onSubmitEditing={val =>
                      this.setState({LastName: val, VLName: false})
                    }
                  />
                </Col>
              </Item>
              <Item
                fixedLabel
                style={[DynamicM(5, 5, 0, 0), CommonStyles.stdInput]}>
                <Col size={2} style={CommonStyles.vhc}>
                  <Text style={{color: 'red', paddingLeft: 40}}>*</Text>
                  <EmailIcon size={20} color={'#A6BCD0'} />
                </Col>
                <Col size={8}>
                  <CInput
                    style={[
                      this.state.VEmail === true
                        ? {borderBottomColor: 'red', borderBottomWidth: 1}
                        : {},
                      CommonStyles.white,
                      this.state.validEmail
                        ? {borderBottomWidth: 1, borderBottomColor: 'red'}
                        : {},
                      {color: TColors.bgSecondary, borderBottom: 1},
                    ]}
                    placeholderTextColor={'#A6BCD0'}
                    placeholder="Email"
                    keyboardType="email-address"
                    KeyboardCallback={val => this.animateLogo(val)}
                    onSubmitEditing={val =>
                      this.setState({Email: val, VEmail: false})
                    }
                  />
                </Col>
              </Item>
              <Item
                fixedLabel
                style={[DynamicM(5, 5, 0, 0), CommonStyles.stdInput]}>
                <Col size={2} style={CommonStyles.vhc}>
                  <Text style={{color: 'red', paddingLeft: 40}}>*</Text>
                  <PasswordIcon size={20} color={'#A6BCD0'} />
                </Col>
                <Col size={8}>
                  <CInput
                    style={[
                      this.state.VPassword === true
                        ? {borderBottomColor: 'red', borderBottomWidth: 1}
                        : {},
                      CommonStyles.white,
                      {color: TColors.bgSecondary},
                    ]}
                    placeholderTextColor={'#A6BCD0'}
                    placeholder="Password"
                    security={true}
                    KeyboardCallback={val => this.animateLogo(val)}
                    onSubmitEditing={val => {
                      // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(val)
                      //
                      this.setState({Password: val, VPassword: false});
                      // : this.setState({invalidPass: true});
                    }}
                  />
                </Col>
              </Item>
              <Item
                fixedLabel
                style={[DynamicM(5, 5, 0, 0), CommonStyles.stdInput]}>
                <Col
                  size={2}
                  style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <IconFA
                    name="transgender"
                    size={20}
                    style={{paddingLeft: 20}}
                    color={'#A6BCD0'}
                  />
                  <Text style={{color: 'red', paddingLeft: 8}}>*</Text>
                </Col>
                <Col
                  size={8}
                  style={[
                    DynamicP(0, 0, 10, 0),
                    {flexDirection: 'row', alignItems: 'center'},
                  ]}>
                  <Input
                    style={[CommonStyles.white, {color: TColors.bgSecondary}]}
                    placeholder="Gender"
                    value={this.state.Gender === true ? 'Male' : 'Female'}
                    disabled
                    placeholderTextColor="#A6BCD0"
                  />

                  <Switch
                    value={this.state.Gender}
                    onChange={() => this.setState({Gender: !this.state.Gender})}
                  />
                </Col>
              </Item>
              <Item
                fixedLabel
                style={[DynamicM(5, 5, 0, 0), CommonStyles.stdInput]}>
                <Col
                  size={2}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <IconFA
                    name="calendar"
                    style={{paddingLeft: 25}}
                    size={20}
                    color="#A6BCD0"
                  />
                  <Text style={{color: 'red', paddingLeft: 8}}>*</Text>
                </Col>
                <Col
                  size={8}
                  style={[
                    DynamicP(0, 0, 10, 0),
                    {flexDirection: 'row', alignItems: 'center'},
                  ]}>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        isDatePickerVisible: !this.state.isDatePickerVisible,
                      })
                    }>
                    <Input
                      style={[
                        this.state.VDOB === true
                          ? {borderBottomColor: 'red', borderBottomWidth: 1}
                          : {},
                        CommonStyles.white,
                        {color: TColors.bgSecondary},
                      ]}
                      placeholder="DOB"
                      disabled
                      value={this.state.DOB}
                      placeholderTextColor="#A6BCD0"
                    />
                  </TouchableOpacity>
                </Col>
              </Item>
              <Item
                fixedLabel
                style={[DynamicM(5, 5, 0, 0), CommonStyles.stdInput]}>
                <Col size={2} style={CommonStyles.vhc}>
                  {/* <Text style={{color: 'red', paddingLeft: 40}}>*</Text> */}
                  <Icon name="phone" size={20} color="#A6BCD0" />
                </Col>
                <Col size={8}>
                  <CInput
                    style={[CommonStyles.white, {color: TColors.bgSecondary}]}
                    placeholderTextColor={'#A6BCD0'}
                    placeholder="Landline No"
                    keyboardType="phone-pad"
                    KeyboardCallback={val => this.animateLogo(val)}
                    onSubmitEditing={val => {
                      this.setState({Phone: val});
                    }}
                  />
                </Col>
              </Item>
              <Item
                fixedLabel
                style={[DynamicM(5, 5, 0, 0), CommonStyles.stdInput]}>
                <Col
                  size={2}
                  style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Icon
                    name="mobile1"
                    size={20}
                    style={{paddingLeft: 25}}
                    color="#A6BCD0"
                  />
                  <Text style={{color: 'red', paddingLeft: 8}}>*</Text>
                </Col>
                <Col size={8}>
                  <CInput
                    style={[
                      this.state.VMobile === true
                        ? {borderBottomColor: 'red', borderBottomWidth: 1}
                        : {},
                      CommonStyles.white,
                      {color: TColors.bgSecondary},
                    ]}
                    placeholderTextColor={'#A6BCD0'}
                    placeholder="Mobile"
                    keyboardType="phone-pad"
                    KeyboardCallback={val => this.animateLogo(val)}
                    onSubmitEditing={val =>
                      this.setState({Mobile: val, VMobile: false})
                    }
                  />
                </Col>
              </Item>
              <Item
                fixedLabel
                style={[DynamicM(5, 5, 0, 0), CommonStyles.stdInput]}>
                <Col
                  size={2}
                  style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <IconFA
                    name="address-card-o"
                    style={{paddingLeft: 25}}
                    size={20}
                    color="#A6BCD0"
                  />
                  <Text style={{color: 'red', paddingLeft: 8}}>*</Text>
                </Col>
                <Col size={8}>
                  <CInput
                    style={[
                      this.state.VHNo === true
                        ? {borderBottomColor: 'red', borderBottomWidth: 1}
                        : {},
                      CommonStyles.white,
                      {color: TColors.bgSecondary},
                    ]}
                    placeholderTextColor={'#A6BCD0'}
                    placeholder="House No"
                    KeyboardCallback={val => this.animateLogo(val)}
                    onSubmitEditing={val =>
                      this.setState({HouseNo: val, VHNo: false})
                    }
                  />
                </Col>
              </Item>

              <Item
                fixedLabel
                style={[DynamicM(5, 5, 0, 0), CommonStyles.stdInput]}>
                <Col
                  size={2}
                  style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <IconFA
                    name="address-card-o"
                    style={{paddingLeft: 25}}
                    size={20}
                    color="#A6BCD0"
                  />
                  <Text style={{color: 'red', paddingLeft: 8}}>*</Text>
                </Col>
                <Col size={8}>
                  <CInput
                    style={[
                      this.state.VStreet === true
                        ? {borderBottomColor: 'red', borderBottomWidth: 1}
                        : {},
                      CommonStyles.white,
                      {color: TColors.bgSecondary},
                    ]}
                    placeholderTextColor={'#A6BCD0'}
                    placeholder="Street"
                    KeyboardCallback={val => this.animateLogo(val)}
                    onSubmitEditing={val =>
                      this.setState({Address: val, VStreet: false})
                    }
                  />
                </Col>
              </Item>
              <Item
                fixedLabel
                style={[DynamicM(5, 5, 0, 0), CommonStyles.stdInput]}>
                <Col size={2} style={CommonStyles.vhc}>
                  <IconFA name="building-o" size={20} color="#A6BCD0" />
                </Col>
                <Col size={8}>
                  <CInput
                    style={[CommonStyles.white, {color: TColors.bgSecondary}]}
                    placeholderTextColor={'#A6BCD0'}
                    placeholder="Building Name"
                    KeyboardCallback={val => this.animateLogo(val)}
                    onSubmitEditing={val => this.setState({BuildingName: val})}
                  />
                </Col>
              </Item>
              <Item
                fixedLabel
                style={[DynamicM(5, 5, 0, 0), CommonStyles.stdInput]}>
                <Col
                  size={2}
                  style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Icon
                    name="arrowdown"
                    size={20}
                    style={{paddingLeft: 25}}
                    color="#A6BCD0"
                  />
                  <Text style={{color: 'red', paddingLeft: 8}}>*</Text>
                </Col>
                <Col size={8}>
                  <CInput
                    style={[
                      this.state.VPCode === true
                        ? {borderBottomColor: 'red', borderBottomWidth: 1}
                        : {},
                      CommonStyles.white,
                      {color: TColors.bgSecondary},
                    ]}
                    placeholderTextColor={'#A6BCD0'}
                    placeholder="Post Code"
                    keyboardType="phone-pad"
                    KeyboardCallback={val => this.animateLogo(val)}
                    onSubmitEditing={val => {
                      this.setState({PostCode: val, VPCode: false});
                    }}
                  />
                </Col>
              </Item>
            </Content>
            <Text style={{fontSize: 12,marginTop:10, color: 'white'}}>
            Note: {this.props.settings.WarningMessage}
          </Text>
            <LoadingButton
              isBlock={true}
              submitting={this.state.submitting}
              rounded={true}
              loaderColor={'white'}
              btnText={'Create Account'}
              style={[DynamicM(20, 10, 0, 0), {backgroundColor: '#377CE1'}]}
              callback={() => this.state.submitting === true ? this.submit() : null}
            />
            {/* <Button
              onPress={() => this.submit()}
              block
              rounded
              style={[DynamicM(20, 10, 0, 0), {backgroundColor: '#377CE1'}]}>
              <Icon name="arrowright" size={15} color="white" />
              <Text style={CommonStyles.uppercase}>Create Account</Text>
            </Button> */}
          </View>
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
            Already Have an Account!
          </Text>
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
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings.info
});

const mapDispatchToProps = dispatch => ({
  doLogin: (email, Password) => dispatch(doLogin(email, Password)),
  saveUserToken: response => dispatch(saveUserToken(response)),
  doSignUp: userObj => dispatch(doSignUp(userObj)),
  getUserToken: () => dispatch(getUserToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
