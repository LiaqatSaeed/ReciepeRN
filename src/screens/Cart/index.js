//references Region
import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import {Container, Content, List, Text} from 'native-base';
import CstHeader from '../Headers';
import {connect} from 'react-redux';
import {DrawerActions} from 'react-navigation-drawer';
import CommonStyles, {DynamicP, DynamicM} from '../../components/Styles';
import {CBreadCrumb} from '../../components/Card';
import {CCartItem} from '../../components/ListItem';
import {removeItemFromCart} from '../../actions/CartActions';
import {getProduct} from '../../actions/ProductActions';
import {LoadingButton, CAlert, NoData} from '../../components/Utilities';

//endregion

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      submitting: true,
      itemToChange: 0,
      totalPrice: 0,
    };
  }
  async UNSAFE_componentWillMount() {}

  _getProduct = (productId, isDetail) => {
    this.props
      .getProduct(productId)
      .then(res => {
        this.props.navigation.navigate(!isDetail ? 'AddToCart' : 'Product');
      })
      .catch(err => {});
  };

  _removeItemFromCart = cartId => {
    this.props
      .removeItemFromCart(cartId)
      .then(res => {
        CAlert({
          title: 'Success',
          message: 'Item is successfully removed from cart',
          buttons: [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        });
      })
      .catch(err => {});
  };

  renderListItem = (item, index) => (
    <CCartItem
      data={item}
      viewDetails={() =>
        this._getProduct(item.ProductID, true)
      }
      play={this.state.itemToChange}
      makeFav={isFav => this._updateWishList(isFav, item.ProductID)}
      removeCart={() => {
        this._removeItemFromCart(item.ShoppingCartDetailID);
      }}
      callback={() => this._getProduct(item.ProductID, false)}
    />
  );

  render() {
    var TotalValu = 0;
    return (
      <Container
        style={{
          backgroundColor: '#E2E9F5',
        }}>
        <CstHeader
          isInfo={true}
          openContact={() => {
            this.props.navigation.navigate('Contact');
          }}
          isWish={true}
          openWishlist={() => {
            this.props.navigation.navigate('Wish');
          }}
          isMenu={true}
          OpenMenu={() => {
            this.props.navigation.dispatch(DrawerActions.toggleDrawer());
          }}
          Screen={'Niazi Foods'}
          isCart={false}
          openCart={() => {}}
        />
        {this.props.cart.length > 0 ? (
          <>
            <Content>
              <CBreadCrumb
                text={`Cart`}
                color={'#292D39'}
                right={false}
                style={[{backgroundColor: 'white'}, DynamicP(10, 10, 10, 10)]}
              />
              <List>
                <FlatList
                  style={{paddingTop: 4}}
                  data={this.props.cart}
                  renderItem={({item, index}) =>
                    this.renderListItem(item, index)
                  }
                  keyExtractor={item => {
                    item.$id;
                  }}
                  refreshing={this.state.refreshing}
                  onEndReachedThreshold={0.1}
                />
              </List>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  margin: 10,
                  padding: 10,
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: '#2e2e2e', fontWeight: '700'}}>Total</Text>
                <Text style={{color: '#2e2e2e', fontWeight: '700'}}>
                  £{this.props.TotalPrice}
                </Text>
              </View>
            </Content>
            <LoadingButton
              isBlock={true}
              submitting={this.state.submitting}
              rounded={false}
              loaderColor={'white'}
              btnText={'Checkout'}
              style={[DynamicM(0, 0, 0, 0), {backgroundColor: '#377CE1'}]}
              callback={() =>
                CAlert({
                  title: 'Checkout',
                  message: 'Checkout is under construction',
                  buttons: [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                })
              }
            />
          </>
        ) : (
          <NoData text="No Items in Cart Found" />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart.cartItem,
  TotalPrice: state.cart.TotalPrice,
});

const mapDispatchToProps = dispatch => ({
  getProduct: productId => dispatch(getProduct(productId)),
  removeItemFromCart: cartID => dispatch(removeItemFromCart(cartID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
