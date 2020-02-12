//references Region
import React, {Component} from 'react';
import {View} from 'react-native';
import {
  Container,
  Content,
  Form,
  Button,
  Text,
  Input,
  Title,
  Header,
  Left,
  Right,
} from 'native-base';
import CstHeader from '../../Headers';
import {connect} from 'react-redux';
import {DrawerActions} from 'react-navigation-drawer';
import CommonStyles, {DynamicP, DynamicM} from '../../../components/Styles';
import {CBreadCrumb} from '../../../components/Card';
import {CPCard} from '../../../components/Card';
import {
  CFItem,
  CCBtn,
  LoadingButton,
  CAlert,
} from '../../../components/Utilities';
import {CBSheet} from '../../../components/BottomSheet';
import Icon from 'react-native-vector-icons/AntDesign';
import {updateWishList} from '../../../actions/ProductActions';
import {addItemToCart} from '../../../actions/CartActions';
import {getcart} from '../../../actions/CartActions';
//endregion

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      selectedQty: '1',
      submitting: true,
      setRBSheet: {},
    };
  }
  async UNSAFE_componentWillMount() {}

  _updateWishList = (isFav, productId) => {
    this.props
      .updateWishList(productId)
      .then(res => {})
      .catch(err => {});
  };

  _addItemToCart = ProductId => {
    this.setState({submitting: false});
    this.props
      .addItemToCart(ProductId, parseInt(this.state.selectedQty))
      .then(res => {
        CAlert({
          title: 'Added to Cart',
          message: 'Product has been added to cart',
          buttons: [
            {
              text: 'OK',
              onPress: () =>
                this.setState({submitting: true}, () => {
                  this._getcart(() => {
                    this.state.setRBSheet();
                    this.props.navigation.navigate('Cart');
                  });
                }),
            },
          ],
        });
      })
      .catch(err => {});
  };

  _getcart = callback => {
    this.props
      .getcart()
      .then(res => {
        callback();
      })
      .catch(err => {});
  };
  updateQty = val => {
    val = parseInt(this.state.selectedQty) + val;
    if (val < 0) {
      val = 0;
    } else if (val > this.props.product.Quantity) {
      val = this.props.product.Quantity;
    }
    this.setState({
      selectedQty: val.toString(),
    });
  };

  render() {
    return (
      <Container
        style={{
          backgroundColor: 'white',
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
          isCart={true}
          openCart={() => this.props.navigation.navigate('Cart')}
        />
        <Content>
          <CBreadCrumb
            text={'Add to Cart'}
            color={'#292D39'}
            right={false}
            style={[{backgroundColor: 'white'}, DynamicP(10, 10, 10, 10)]}
          />
          <CPCard
            item={this.props.product}
            isAdd={false}
            makeFav={isfav =>
              this._updateWishList(isfav, this.props.product.ProductID)
            }
            quantity={this.props.product.Quantity}
          />
          <Form>
            <CFItem
              label={'Category'}
              value={this.props.product.CategoryName}
            />
            <CFItem
              label={'Child Category'}
              value={this.props.product.SubCategoryName}
            />
          </Form>

          <CBSheet
            btnText={'Add Quantity'}
            callback={rbSheet => {
              this.setState({setRBSheet: rbSheet});
            }}>
            <CFItem
              label={'Qty'}
              item={
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Left style={{flex: 4}}>
                    <Input
                      style={{width: '100%', borderBottomColor: 'red'}}
                      keyboardType="numeric"
                      disabled
                      ref={el => {
                        this.quantity = el;
                      }}
                      value={this.state.selectedQty}
                    />
                  </Left>

                  <Right style={{width: 40}}>
                    <CCBtn
                      style={{
                        backgroundColor: '#377CE1',
                        height: 20,
                        width: 20,
                      }}
                      callback={val => this.updateQty(1)}>
                      <Icon name="plus" size={18} style={{color: 'white'}} />
                    </CCBtn>
                    <CCBtn
                      style={[
                        {backgroundColor: '#377CE1', height: 20, width: 20},
                        DynamicM(5, 10, 0, 0),
                      ]}
                      callback={val => this.updateQty(-1)}>
                      <Icon name="minus" size={18} style={{color: 'white'}} />
                    </CCBtn>
                  </Right>
                  <Text style={[DynamicM(0, 0, 0, 10), {fontSize: 14}]}>
                    {`${this.props.product.Quantity}  items available`}
                  </Text>
                </View>
              }
            />
            {this.props.product.Quantity !== 0 ? (
              <LoadingButton
                submitting={this.state.submitting}
                loaderColor={'white'}
                btnText={'Add to Cart'}
                style={[DynamicM(20, 10, 0, 0), {backgroundColor: '#377CE1'}]}
                callback={() =>
                  this._addItemToCart(this.props.product.ProductID)
                }
              />
            ) : (
              <Text>Out of Stock</Text>
            )}
          </CBSheet>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product.product,
});

const mapDispatchToProps = dispatch => ({
  getProduct: ProductId => dispatch(getProduct(ProductId)),
  updateWishList: ProductId => dispatch(updateWishList(ProductId)),
  addItemToCart: (ProductId, QTY) => dispatch(addItemToCart(ProductId, QTY)),
  getcart: () => dispatch(getcart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
