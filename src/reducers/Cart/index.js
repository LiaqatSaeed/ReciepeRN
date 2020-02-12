const cartReducer = (
  state = {
    cartItem: [],
    New: {},
    TotalPrice: 0,
  },
  action,
) => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        TotalPrice: action.Info.TotalAmount,
        cartItem: [...action.Info.ShoppingCartItems],
      };
    // case 'ADD_TO_CART':
    //
    //   return {...state, New: action.Info};
    case 'DELETE_FROM_CART':
      var temp = state.cartItem.filter(
        obj => obj.ShoppingCartDetailID !== action.Info,
      );

      return {...state, cartItem: temp};
    case 'RESET_CART':
      return {...state, cartItem: []};
    default:
      return state;
  }
};

export default cartReducer;
