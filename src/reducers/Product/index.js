const productReducer = (
  state = {
    categories: [],
    subCategories: [],
    bumperSale: [],
    onSale: [],
    products: [],
    product: {},
    productSale: [],
    wishList: [],
    page: 1,
    initialTab: 0,
    activeSubCategory: 0,
  },
  action,
) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return {...state, categories: action.Info};
    case 'SET_SUB_CATEGORIES':
      var tempcate = state.categories.filter(
        o => o.CategoryID === action.Info,
      )[0];
      return {...state, subCategories: tempcate};
    case 'SET_BUMPER_SALE':
      return {...state, bumperSale: action.Info};
    case 'SET_ON_SALE':
      return {...state, onSale: action.Info};
    case 'SET_PRODUCTS':
      var temp = [...state.products, ...action.Info];
      debugger;
      temp = temp.filter(o => o.SubCategoryID === state.activeSubCategory);
      return {
        ...state,
        products: temp,
        page: action.Page,
      };
    case 'RESET_PRODUCTS':
      return {
        ...state,
        activeSubCategory: action.SubCategoryId,
        products: action.Info,
        page: action.Page,
      };
    case 'SET_PRODUCT':
      return {...state, product: action.Info};
    case 'UPDATE_PRODUCT':
      var tempcate = state.products.filter(o => o.ProductID === action.Info);
      if (tempcate.length > 0) {
        tempcate[0].IsWishlist = tempcate[0].IsWishlist > 0 ? 0 : 2;
        tempcate = state.products.map(
          obj => tempcate.find(o => o.ProductID === obj.ProductID) || obj,
        );
      }
      var tempProduct = state.product;
      if (tempProduct.IsWishlist != undefined) {
        tempProduct.IsWishlist = tempProduct.IsWishlist > 0 ? 0 : 2;
      }

      return {...state, products: tempcate, product: tempProduct};

    case 'UPDATE_BUMPER_PRODUCT':
      var tempcate = state.bumperSale.filter(o => o.ProductID === action.Info);
      if (tempcate.length > 0) {
        tempcate[0].IsWishlist = tempcate[0].IsWishlist > 0 ? 0 : 2;
        tempcate = state.bumperSale.map(
          obj => tempcate.find(o => o.ProductID === obj.ProductID) || obj,
        );
      }
      return {...state, bumperSale: tempcate};
    case 'SET_PRODUCT_SALE':
      return {...state, productSale: action.Info};
    case 'SET_WISHLIST':
      return {...state, wishList: [...action.Info]};
    default:
      return state;
  }
};

export default productReducer;
