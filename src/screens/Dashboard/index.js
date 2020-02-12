//references Region
import React, {Component} from 'react';
import {Alert, FlatList} from 'react-native';
import {Container, Content, List} from 'native-base';
import CstHeader from '../Headers';
import {connect} from 'react-redux';
import {DrawerActions} from 'react-navigation-drawer';
import CommonStyles, {DynamicP, DynamicM} from '../../components/Styles';
import {CBreadCrumb} from '../../components/Card';
import {CCarousel} from '../../components/Carousel';
import {CListItem} from '../../components/ListItem';
import {CLoader} from '../../components/Utilities';
import {
  getCategories,
  getBumperSale,
  getSubCategories,
  getProduct,
  getProducts,
  updateWishList,
} from '../../actions/ProductActions';

//endregion

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      loading: true,
      itemToChange: 12318,
      page: 1,
      pageSize:10,
    };
  }
  async UNSAFE_componentWillMount() {
    await this._getBumperSale();
    await this._getCategories();
  }

  _getBumperSale = props => {
    this.props
      .getBumperSale()
      .then(res => {
        
        this.setState({loading: false});
      })
      .catch(err => {});
  };

  _getCategories = props => {
    this.props
      .getCategories()
      .then(res => {})
      .catch(err => {});
  };

  _getProduct = (productId, isDetail) => {
    this.props
      .getProduct(productId)
      .then(res => {
        this.props.navigation.navigate(!isDetail ? 'AddToCart' : 'Product');
      })
      .catch(err => {});
  };

  _updateWishList = (isFav, productId) => {
    this.setState({itemToChange: productId});
    this.props
      .updateWishList(productId)
      .then(res => {
        this.setState({itemToChange: 0});
      })
      .catch(err => {});
  };

  _getSubCategories = (categoryID, subCategoryID) => {
    this.props
      .getSubCategories(categoryID, subCategoryID)
      .then(res => {
        this._getProducts(categoryID, subCategoryID);
      })
      .catch(err => {});
  };

  _getProducts = (CateoryId, SubCategoryId) => {
    this.setState({loading: true});
    this.props
      .getProducts(this.state.page,this.state.pageSize, CateoryId, SubCategoryId)
      .then(res => {
        this.setState({loading: false});
        this.props.navigation.navigate('SubCategory');
      })
      .catch(err => {});
  };

  // _getProduct = productId => {
  //   this.props
  //     .getProduct(productId)
  //     .then(res => {
  //       this.props.navigation.navigate('Product');
  //     })
  //     .catch(err => {});
  // };

  _showAlert(title, msg, btn) {
    Alert.alert(title, msg, [
      {text: btn == null ? 'Okay' : btn, onPress: () => {}},
    ]);
  }

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
          openCart={() => {
            this.props.navigation.navigate('Cart');
          }}
        />
        <Content>
          {this.state.loading ? (
            <CLoader />
          ) : (
            <>
              {this.props.bumperSale.length > 0 ? (
                <>
                  <CBreadCrumb
                    text={'BUMPER SALE'}
                    color={'#292D39'}
                    left={true}
                    right={false}
                    style={[
                      {backgroundColor: 'white', marginBottom: 10},
                      DynamicP(10, 10, 10, 10),
                    ]}
                  />
                  <CCarousel
                    list={this.props.bumperSale}
                    play={this.state.itemToChange}
                    makeFav={(isFav, productID) =>
                      this._updateWishList(isFav, productID)
                    }
                    callback={(productID, istrue) => this._getProduct(productID, istrue)}
                  />
                </>
              ) : null}
              {/* {this.props.bumperSale.length > 0 ? (
                <CCarousel
                  list={this.props.bumperSale}
                  play={this.state.itemToChange}
                  makeFav={(isFav, productID) =>
                    this._updateWishList(isFav, productID)
                  }
                  callback={productID => this._getProduct(productID)}
                />
              ) : null} */}

              {this.props.categories.length > 0 ? (
                <>
                  <CBreadCrumb
                    text={'CHOOSE FROM BELOW CATEGORIES'}
                    color={'#292D39'}
                    left={false}
                    right={false}
                    style={{backgroundColor: 'transparent', marginBottom: 10}}
                  />
                  <List>
                    <FlatList
                      style={{paddingTop: 4}}
                      data={this.props.categories}
                      renderItem={({item, index}) => (
                        <CListItem
                          data={item}
                          callback={() =>
                            this._getSubCategories(item.CategoryID ,item.SubCategories[0].SubCategoryID)
                          }
                        />
                      )}
                      keyExtractor={item => {
                        item.$id;
                      }}
                      refreshing={this.state.refreshing}
                      onEndReachedThreshold={0.1}
                    />
                  </List>
                </>
              ) : null}
            </>
          )}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.product.categories,
  bumperSale: state.product.bumperSale,
});

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(getCategories()),
  getSubCategories: categoryID => dispatch(getSubCategories(categoryID)),
  getBumperSale: () => dispatch(getBumperSale()),
  getProduct: productID => dispatch(getProduct(productID)),
  getProducts: (page, pagesize, CateoryId, SubCategoryId) =>
    dispatch(getProducts(page, pagesize, CateoryId, SubCategoryId)),
  updateWishList: productID => dispatch(updateWishList(productID, true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
