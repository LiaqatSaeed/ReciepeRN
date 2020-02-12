import AsyncStorage from '@react-native-community/async-storage';

export const getToken = async () => {
  let Token = await AsyncStorage.getItem('@UserAuth');
  Token = await JSON.parse(Token);
  return `${Token.token_type} ${Token.access_token}`;
  //return `bearer HD925QDrFaqkfC3eE8TgkDVyfq8ZBI25nYNmRutqk6z6L5vAa7cmZiZ8lZMeqLi-PULfNQbDgWZ6AfK7m53BKq5uJ3HZhH78PGd6TI4zBPaMNqlcSELwD9etsIDfQ9pmm9lJw_bfV1QDOolrbS34gmHIQgoIOJghENyKayh7gpBp3-GcHlC9j-sX14viwFXe0HEJyRvzMANOXMytsnL01WY-G_D46ekS1YL-UlbleXKDBadcS2d7wi0-ijcAsADXOdzohFTNc7BoAK5tmyDGlDkKYE9pjzLr_34yIi7vyuwXMz6Luhf4fQBzYtkl_gES4zldNYGyeg2qYViVG2USaIV2PKEQpsWf1c_Znd6U4Gxn07bVZyeXeZb5LtbepV0aBXfP24ZbORVZdKfozbf7FE2JrKluPFgRj7jyRnGlzdzTB2WLJcd2TSPPCd-D7-KJwlkbA8tLFKk4S8JsUipkAB-l5HVTj0cTA05aNusybFTcHJRN1E7WeZSJx3ZswUO6FdIK6DwG3UE-0BusGbuVb9pcWW3LwW1J13juJZhD4PZQ5zMNTC6cCwPJpwIm7id1iNXCRbuGH0tY0gtKdrG5536xcxP_mT_rmLzFy3u9EBVlHFIZdjS4mTL2_Js1az5oswHPscRNr-0qjObAqassfQ`;
};

const DomainURL = 'https://www.niazifoods.com';
const ApiEndpoints = {
  signIn: '/authtoken',
  signUp: '/application/signup',
  verifyCode:'/application/verify',
  settings: '/application/appsettings',
  forget:'/application/forget',
  categories: '/application/Categories',
  bumperSale: '/application/bumpersale',
  productSale: '/application/productsale',
  products: '/application/Products',
  wishlist: '/application/getwishlist',
  updateWishlist: '/application/updatewishlist',
  addtocart: '/application/addtocart',
  removefromcart: '/application/removecart',
  emptycart: '/application/emptycart',
  getcart: '/application/getcart',
};

//region Fetch Mechanism
const GetSecured = async URL => {
  let Token = await getToken();

  if (Token != null) {
    let response = await fetch(DomainURL + URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: Token,
      },
    });
    return await ReturnResponse(response);
  }
};
const PostSecured = async (URL, params) => {
  let Token = await getToken();
  if (Token != null) {
    let response = await fetch(DomainURL + URL, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: Token,
      },
      method: 'POST',
      body: JSON.stringify(params),
    });
    
    return await ReturnResponse(response);
  }
};

const PostSecurednoParam = async URL => {
  let Token = await getToken();
  
  if (Token != null) {
    let response = await fetch(DomainURL + URL, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: Token,
      },
      method: 'POST',
    });
    return await ReturnResponse(response);
  }
};
const Post = async (URL, params) => {
  let response = await fetch(DomainURL + URL, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    body: JSON.stringify(params),
  });

  return await ReturnResponse(response);
};

const PostnoParams = async (URL, params) => {
  let response = await fetch(DomainURL + URL, {
    headers: {
      'Content-Type': 'application/json',
    }, 
    method: 'POST',
    body: JSON.stringify(params),
  });

  return await ReturnResponse(response);
};
const Get = async URL => {
  let response = await fetch(DomainURL + URL);
  return await ReturnResponse(response);
};

const GetToken = async (URL, params) => {
  let response = await fetch(DomainURL + URL, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    body: params,
  });

  return await ReturnResponse(response);
};

const ReturnResponse = async response => {
  
  if (response.ok) {
    let responseJson = await response.clone().json();
    // responseJson.status = response.status;

    return responseJson;
  } else {
    response = {
      error: 'error',
      status: response.status,
      error_description:
        'Unable to process Your request Please contact your admin',
    };
    return response;
  }
};
//endregion

const setStoreData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

export {
  DomainURL,
  setStoreData,
  Get,
  GetSecured,
  Post,
  PostSecured,
  ApiEndpoints,
  GetToken,
  PostSecurednoParam,
  PostnoParams
};
