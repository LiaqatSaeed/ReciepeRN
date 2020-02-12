import {GetToken, ApiEndpoints , PostnoParams, PostSecurednoParam} from '../../data';
import {saveUserToken} from './AsyncStorage';
import {error, success} from './CommonActions';
import {getUserObj, setUser} from './UserActions';

const doLogin = (UserName, Password) => async dispatch => {
  try {
    let response = await GetToken(
      ApiEndpoints.signIn,
      `grant_type=password&username=${UserName}&password=${Password}`,
    );

    if (response.error) {
      return dispatch(error(response || 'ERROR'));
    } else {
      dispatch(setUser(getUserObj(response, false)));
      return dispatch(success(getUserObj(response, true)));
    }
  } catch (error) {
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

const doSignUp = UserObj => async dispatch => {
  try {
    
    let response = await PostnoParams(ApiEndpoints.signUp,UserObj);
    
    if (response.error) {
      return dispatch(error(response || 'ERROR'));
    } else {
      return dispatch(success(response));
    }
  } catch (error) {
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

const doVerify = () => async dispatch => {
  try {
    
    let response = await PostSecurednoParam(ApiEndpoints.verifyCode);
    
    if (response.error) {
      return dispatch(error(response || 'ERROR'));
    } else {
      return dispatch(success(response));
    }
  } catch (error) {
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

const doForget = (Email) => async dispatch => {
  try {
    
    let response = await PostSecurednoParam(`${ApiEndpoints.forget}?Email=${Email}`);
    
    if (response.error) {
      return dispatch(error(response || 'ERROR'));
    } else {
      return dispatch(success(response));
    }
  } catch (error) {
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};


export {doLogin, doSignUp, doVerify, doForget};
