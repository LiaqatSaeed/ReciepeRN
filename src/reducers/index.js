import {combineReducers} from 'redux';
import userReducer from './User';
import productReducer from './Product';
import cartReducer from './Cart';
import settinsReducer from './Setting'


export default combineReducers({
  User: userReducer,
  product: productReducer,
  cart: cartReducer,
  settings: settinsReducer  
});
