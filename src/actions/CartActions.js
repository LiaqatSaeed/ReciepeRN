import {PostSecurednoParam, ApiEndpoints, GetSecured} from '../../data';
import {error, success} from './CommonActions';

// const addToCart = item => ({
//   type: 'ADD_TO_CART',
//   Info: item,
// });

const setCart = item => ({
  type: 'SET_CART',
  Info: item,
});

const removeFromCart = item => ({
  type: 'DELETE_FROM_CART',
  Info: item,
});

const resetCart = () => ({
  type: 'RESET_CART',
});

const addItemToCart = (ProductId, QTY) => async dispatch => {
  try {
    
    let response = await PostSecurednoParam(
      `${ApiEndpoints.addtocart}?id=${ProductId}&count=${QTY}`,
    );
    
    if (response.error) {
      return dispatch(error(response || 'ERROR'));
    } else {
      //await addToCart(ProductId);
      return dispatch(success(response));
    }
  } catch (error) {
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};
const removeItemFromCart = ShoppingCartDetailID => async dispatch => {
  try {
    
    let response = await PostSecurednoParam(
      `${ApiEndpoints.removefromcart}?id=${ShoppingCartDetailID}`,
    );

    if (response.error) {
      return dispatch(error(response || 'ERROR'));
    } else {
      await dispatch(removeFromCart(ShoppingCartDetailID));
      return dispatch(success(response));
    }
  } catch (error) {
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

const emptyCart = () => async dispatch => {
  try {
    
    let response = await PostSecurednoParam(ApiEndpoints.emptycart);

    if (response.error) {
      return dispatch(error(response || 'ERROR'));
    } else {
      await dispatch(resetCart());
      return dispatch(success(response));
    }
  } catch (error) {
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

const getcart = () => async dispatch => {
  try {
    
    let response = await GetSecured(ApiEndpoints.getcart);

    if (response.error) {
      return dispatch(error(response || 'ERROR'));
    } else {
      await dispatch(setCart(response));
      return dispatch(success(response));
    }
  } catch (error) {
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

export {addItemToCart, removeItemFromCart, emptyCart, getcart};
