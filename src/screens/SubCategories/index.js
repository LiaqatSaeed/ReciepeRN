//references Region
import React, {Component} from 'react';
import {Alert, FlatList} from 'react-native';
import {
  Container,
  Content,
  List,
  Tab,
  Tabs,
  ScrollableTab,
  Text,
} from 'native-base';
import CstHeader from '../Headers';
import {connect} from 'react-redux';
import {DrawerActions} from 'react-navigation-drawer';
import CommonStyles, {DynamicP} from '../../components/Styles';
import {CBreadCrumb} from '../../components/Card';
import {CProductListItem} from '../../components/ListItem';
import {CTabs} from '../../components/Tabs';
import {
  getProducts,
  getProduct,
  updateWishList,
} from '../../actions/ProductActions';
import {CLoader} from '../../components/Utilities';

//endregion

class SubCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      loading: false,
      locked: false,
      PageSize: 2,
      activSubCate:0,
    };
  }
  async UNSAFE_componentWillMount() {
    this.setState({loading: true});
    this.props.category.SubCategories.length > 0
      ? await this._getProducts(
          1,
          this.state.pagesize,
          this.props.category.CategoryID,
          this.props.category.SubCategories[0].SubCategoryID,
        )
      : null;
  }

  _getProducts = (page, pagesize, CateoryId, SubCategoryId) => {
    this.setState({locked: true, refreshing: true});
    this.props
      .getProducts(page, pagesize, CateoryId, SubCategoryId)
      .then(res => {
        this.setState({
          Page: page,
          loading: false,
          locked: false,
          activSubCate:SubCategoryId,
          refreshing: false,
        });
        //this.props.navigation.navigate('Products');
      })
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
    this.props
      .updateWishList(productId)
      .then(res => {
        this.setState({refreshing: true});
      })
      .catch(err => {});
  };

  _onEndReach = () => {
    
    this._getProducts(
      this.state.Page + 1,
      this.state.pagesize,
      this.props.category.CategoryID,
      this.state.activSubCate,
    );
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

        {/* <CBreadCrumb
          text={this.props.category.Name}
          color={'#292D39'}
          right={false}
          style={[{backgroundColor: 'white'}, DynamicP(10, 10, 10, 10)]}
        />
        <CTabs data={this.props.category.SubCategories} /> */}

        <Tabs
          locked={true}
          initialPage={this.props.initialTab}
          activeTab={this.props.initialTab}
          //onScroll={() => this.setState({loading: true, Page: 1, locked: true})}
          onChangeTab={({i, ref, from}) =>
            this.setState(
              {
                loading: true,
              },
              () =>
                this._getProducts(
                  1,
                  15,
                  this.props.category.CategoryID,
                  ref.props.SubCategory,
                ),
            )
          }
          tabsContainerStyle={{backgroundColor: 'red'}}
          tabBarUnderlineStyle={{
            borderBottomWidth: 3,
            borderBottomColor: '#3E83FF',
            borderRightWidth: 0,
          }}
          renderTabBar={() => (
            <ScrollableTab style={{backgroundColor: 'white'}} />
          )}>
          {this.props.category.SubCategories.map(obj => (
            <Tab
              key={obj.SubCategoryID}
              activeTabStyle={{backgroundColor: 'white'}}
              activeTextStyle={{color: '#3E83FF', fontWeight: '700'}}
              tabStyle={{backgroundColor: 'white', borderColor: 'transparent'}}
              textStyle={{color: '#8193AE'}}
              heading={obj.Name}
              SubCategory={obj.SubCategoryID}>
              <Content style={{backgroundColor: '#E2E9F5'}}>
                {!this.state.loading ? (
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
                          callback={() =>
                            this._getProduct(item.ProductID, false)
                          }
                        />
                      )}
                      keyExtractor={item => {
                        item.$id;
                      }}
                      refreshing={this.state.refreshing}
                      onEndReachedThreshold={0.1}
                      onEndReached={this._onEndReach}
                    />
                  </List>
                ) : (
                  <CLoader />
                )}
              </Content>
            </Tab>
          ))}
        </Tabs>
        {/* <List>
            <FlatList
              style={{paddingTop: 4}}
              data={this.props.products}
              renderItem={({item, index}) => (
                <CProductListItem
                  data={item}
                  callback={() => this._getProduct(item.ProductID)}
                />
              )}
              keyExtractor={item => {
                item.$id;
              }}
              refreshing={this.state.refreshing}
              onEndReachedThreshold={0.1}
            />
          </List>
        */}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  category: state.product.subCategories,
  products: state.product.products,
  page: state.product.page,
  initialTab: state.product.initialTab,
});

const mapDispatchToProps = dispatch => ({
  getProducts: (page, pagesize, CateoryId, SubCategoryId) =>
    dispatch(getProducts(page, pagesize, CateoryId, SubCategoryId)),
  getProduct: productId => dispatch(getProduct(productId)),
  updateWishList: productID => dispatch(updateWishList(productID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubCategory);
