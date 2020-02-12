//references Region
import React, {Component} from 'react';
import {Alert, FlatList} from 'react-native';
import {Container, Content, List} from 'native-base';
import CstHeader from '../Headers';
import {connect} from 'react-redux';
import {DrawerActions} from 'react-navigation-drawer';
import CommonStyles, {DynamicP} from '../../components/Styles';
import {CBreadCrumb} from '../../components/Card';
import {CProductListItem} from '../../components/ListItem';
import {getProduct, updateWishList} from '../../actions/ProductActions';

//endregion

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
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
          backgroundColor: '#E2E9F5',
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
        {this.props.products.length > 0 ? (
          <Content>
            <CBreadCrumb
              text={`${this.props.products[0].CategoryName} / ${this.props.products[0].SubCategoryName}`}
              color={'#292D39'}
              right={false}
              style={[{backgroundColor: 'white'}, DynamicP(10, 10, 10, 10)]}
            />
            <List>
              <FlatList
                style={{paddingTop: 4}}
                data={this.props.products}
                renderItem={({item, index}) => (
                  <CProductListItem
                    data={item}
                    viewDetails={() =>
                      this._getProduct(item.ProductID, true)
                    }
                    makeFav={isFav =>
                      this._updateWishList(isFav, item.ProductID)
                    }
                    callback={() => this._getProduct(item.ProductID,false)}
                  />
                )}
                keyExtractor={item => {
                  item.$id;
                }}
                refreshing={this.state.refreshing}
                onEndReachedThreshold={0.1}
              />
            </List>
          </Content>
        ) : null}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  products: state.product.products,
});

const mapDispatchToProps = dispatch => ({
  getProduct: productId => dispatch(getProduct(productId)),
  updateWishList: productID => dispatch(updateWishList(productID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
