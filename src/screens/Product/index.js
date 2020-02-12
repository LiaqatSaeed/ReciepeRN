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
import CstHeader from '../Headers';
import {connect} from 'react-redux';
import {DrawerActions} from 'react-navigation-drawer';
import CommonStyles, {DynamicP, DynamicM,} from '../../components/Styles';
import {CBreadCrumb} from '../../components/Card';
import {CPCard} from '../../components/Card';
import {CFItem, CCBtn, LoadingButton} from '../../components/Utilities';
import {CBSheet} from '../../components/BottomSheet';
import Icon from 'react-native-vector-icons/AntDesign';
import {updateWishList, getProduct} from '../../actions/ProductActions';
import {addItemToCart} from '../../actions/CartActions';
//endregion

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      selectedQty: '0',
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

  _getProduct = (productId,isDetail) => {
    this.props
      .getProduct(productId)
      .then(res => {
        this.props.navigation.navigate(!isDetail ? 'AddToCart' : 'Product');
      })
      .catch(err => {});
  };


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
          <CBreadCrumb
            text={this.props.product.Name}
            color={'#292D39'}
            right={false}
            style={[{backgroundColor: 'white'}, DynamicP(10, 10, 10, 10)]}
          />
          <CPCard
            item={this.props.product}
            makeFav={isfav =>
              this._updateWishList(isfav, this.props.product.ProductID)
            }
            callback={() => this._getProduct(this.props.product.ProductID,false)}
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
            <CFItem
              label={'Quantity'}
              value={`${this.props.product.Quantity}  items available`}
            />
          </Form>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
