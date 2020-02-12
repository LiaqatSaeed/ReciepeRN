//references Region
import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {Container, Content, Form, View, Text} from 'native-base';
import CstHeader from '../Headers';
import {connect} from 'react-redux';
import {DrawerActions} from 'react-navigation-drawer';
import CommonStyles, {DynamicP, DynamicM} from '../../components/Styles';
import {CBreadCrumb} from '../../components/Card';
import {CPCard} from '../../components/Card';
import {CFItem} from '../../components/Utilities';
import UserImg from '../ThumbNail';

//endregion

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
    };
  }
  async UNSAFE_componentWillMount() {}

  render() {
    return (
      <Container
        style={{
          backgroundColor: 'white',
        }}>
        <CstHeader
          isWish={true}
          isInfo={true}
          openContact={() => {
            this.props.navigation.navigate('Contact');
          }}
          openWishlist={() => {
            this.props.navigation.navigate('Wish');
          }}
          isMenu={true}
          OpenMenu={() => {
            this.props.navigation.dispatch(DrawerActions.toggleDrawer());
          }}
          Screen={'Niazi Foods'}
          isCart={true}
          openCart={() => this.props.navigation.navigate('Cart')}
        />
        <Content>
          <View style={CommonStyles.vhc}>
            <UserImg
              UserInfo={{
                FirstName: this.props.user.FirstName,
                LastName: this.props.user.LastName,
                UserImage: '',
                UserImageColor: '#377CE1',
              }}
              fontSize={50}
              size={120}
            />
            <Text
              style={[
                DynamicM(20, 3, 0, 0),
                {fontSize: 20, fontWeight: '700'},
              ]}>
              {`${this.props.user.FirstName} ${this.props.user.LastName}`}
            </Text>
            <Text style={[{fontSize: 15}, CommonStyles.textColor]}>
              {`${this.props.user.CustomerID}`}
            </Text>
          </View>
          <Form>
            <CFItem
              label={'Name'}
              value={`${this.props.user.FirstName} ${this.props.user.LastName}`}
            />

            <CFItem label={'Email'} value={this.props.user.Email} />
            <CFItem label={'Phone'} value={this.props.user.Phone} />
            <CFItem label={'Date of birth'} value={this.props.user.DOB} />

            <CFItem label={'Country'} value={this.props.user.Country} />
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.User.UserInfo,
});

const mapDispatchToProps = dispatch => ({
  getProduct: ProductId => dispatch(getProduct(ProductId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
