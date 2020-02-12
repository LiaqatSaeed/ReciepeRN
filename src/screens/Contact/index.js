//references Region
import React, {Component, useCallback} from 'react';
import {FlatList, Alert, Linking, Platform} from 'react-native';
import {Container, Content, Form, View, Text, Button} from 'native-base';
import CstHeader from '../Headers';
import {connect} from 'react-redux';
import {DrawerActions} from 'react-navigation-drawer';
import CommonStyles, {DynamicP, DynamicM} from '../../components/Styles';
import {CBreadCrumb} from '../../components/Card';
import {CPCard} from '../../components/Card';
import {CFItem, CLogo, CFooter, CLoader} from '../../components/Utilities';
import UserImg from '../ThumbNail';
import Icon from 'react-native-vector-icons/Ionicons';

//endregion
const dialCall = () => {
  let phoneNumber = '';

  if (Platform.OS === 'android') {
    phoneNumber = 'tel:${+44 208 684 9335}';
  } else {
    phoneNumber = 'telprompt:${+44 208 684 9335}';
  }

  Linking.openURL(phoneNumber);
};
const email = () => {
  Linking.openURL(
    'mailto:support@niazifoods.com?subject=mailsubject&body=mailbody',
  );
};
export const sendWhatsAppMessage = () => {
  let link = 'whatsapp://send?text=&phone=+44 208 684 9335';
  Linking.canOpenURL(link)
    .then(supported => {
      if (!supported) {
        Alert.alert('Please install whats app to send direct message');
      } else {
        return Linking.openURL(link);
      }
    })
    .catch(err => console.error('An error occurred', err));
};

const footerData = [
  {
    icon: 'phone',
    iconType: '',
    text: 'Call',
    callback: dialCall,
  },
  {
    icon: 'mail',
    iconType: '',
    text: 'Email',
    callback: email,
  },
  {
    icon: 'whatsapp',
    iconType: 'FontAwesome',
    text: 'WhatsApp',
    callback: sendWhatsAppMessage,
  },
];

class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading:true,
      refreshing: false,
    };
  }

  async componentDidMount() {
    this.setState({loading:false})
  }

  render() {
    return this.state.loading ? (
      <CLoader />
    ) : (
      <Container
        style={{
          backgroundColor: 'white',
        }}>
        <CstHeader
          isWish={true}
          // isInfo={true}
          // openContact={() => {
          //   this.props.navigation.navigate('Contact');
          // }}
          openWishlist={() => {
            this.props.navigation.navigate('Wish');
          }}
          isMenu={true}
          OpenMenu={() => {
            this.props.navigation.dispatch(DrawerActions.toggleDrawer());
          }}
          Screen={'Niazi Foods'}
          isCart={true}
          openCart={() => {}}
        />
        <Content style={DynamicM(20, 0, 0, 0)}>
          <View style={[CommonStyles.vhc, DynamicP(0, 20, 0, 0)]}>
            <CLogo height={120} width={120} />
            <View style={[{flexDirection: 'row'}, CommonStyles.vhc]}>
              <Icon
                name="ios-pin"
                type="Ionicons"
                style={CommonStyles.textColor}
                size={22}>
                {' '}
              </Icon>
              <Text style={[{fontSize: 15}, CommonStyles.textColor]}>
                {this.props.settings.SiteFooter.Address}
              </Text>
            </View>
          </View>

          <CBreadCrumb
            text={'Contact'}
            color={'#292D39'}
            left={false}
            right={false}
            style={[
              {
                backgroundColor: '#E2E9F5',
                marginBottom: 10,
                borderTopColor: '#c5c5c5',
                borderTopWidth: 1,
              },
              DynamicP(10, 10, 10, 10),
            ]}
          />
          <Form>
            <CFItem
              label={'Order Phone Number'}
              value={this.props.settings.SiteFooter.OrderPhoneNo}
            />

            <CFItem
              label={'Help Line Number'}
              value={this.props.settings.SiteFooter.HelplineNo}
            />
            <CFItem
              label={'Complain Phone Number'}
              value={this.props.settings.SiteFooter.ComplaintPhoneNo}
            />
            <CFItem
              label={'Email'}
              value={this.props.settings.SiteFooter.Email}
            />
            <CFItem
              label={'Store Timings Sunday to Thursday'}
              value={this.props.settings.SiteFooter.StoreTimingsSunToThu}
            />
            <CFItem
              label={'Store Timings Friday to Saturday'}
              value={this.props.settings.SiteFooter.StoreTimingsFriToSat}
            />
            <CFItem
              label={'Powered By'}
              value={this.props.settings.SiteFooter.PoweredBy}
            />
            <CFItem value={this.props.settings.SiteFooter.PoweredByURL} />
          </Form>
          <CFooter footerMeta={footerData} />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings.info,
});

const mapDispatchToProps = dispatch => ({
  // getProduct: ProductId => dispatch(getProduct(ProductId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
