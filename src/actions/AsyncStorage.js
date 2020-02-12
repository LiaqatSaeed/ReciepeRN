import AsyncStorage from '@react-native-community/async-storage';
import {error} from './CommonActions';
import {getUserObj, setUser} from './UserActions';

export const getToken = token => ({
  type: 'GET_TOKEN',
  token,
});

export const saveToken = token => ({
  type: 'SAVE_TOKEN',
  token,
});

export const getIsStart = isStarted => ({
  type: 'GET_STARTED',
  isStarted,
});

export const saveIsStart = isStarted => ({
  type: 'GET_STARTED',
  isStarted,
});

export const removeToken = () => ({
  type: 'REMOVE_TOKEN',
});

export const reset = reset => ({
  type: 'RESET',
  reset,
});

export const getStarted = getStarted => ({
  type: 'GET_STARTED',
  getStarted,
});

export const forget = typeName => ({
  type: 'GET_FORGET_TYPE',
  typeName,
});

export const getIsStarted = () => dispatch =>
  AsyncStorage.getItem('@UserStarted')
    .then(data => {
      // dispatch(loading(false));
      return dispatch(getIsStart(data));
    })
    .catch(err => {
      // dispatch(loading(false));
      dispatch(error(err.message || 'ERROR'));
    });

export const setIsStarted = data => dispatch =>
  AsyncStorage.setItem('@UserStarted', JSON.stringify(data))
    .then(data => {
      // dispatch(loading(false));
      dispatch(saveIsStart(true));
    })
    .catch(err => {
      // dispatch(loading(false));
      dispatch(error(err.message || 'ERROR'));
    });

export const removeIsStarted = () => dispatch =>
  AsyncStorage.removeItem('@UserStarted')
    .then(data => {
      // dispatch(loading(false));
      return dispatch(saveIsStart(null));
    })
    .catch(err => {
      // dispatch(loading(false));
      dispatch(error(err.message || 'ERROR'));
    });

export const getUserToken = () => dispatch =>
  AsyncStorage.getItem('@UserAuth')
    .then(data => {
      // dispatch(loading(false));
      return dispatch(setUser(getUserObj(JSON.parse(data), false)));
    })
    .catch(err => {
      // dispatch(loading(false));
      dispatch(error(err.message || 'ERROR'));
    });

export const saveUserToken = data => dispatch =>
  AsyncStorage.setItem('@UserAuth', JSON.stringify(data))
    .then(data => {
      
      // dispatch(loading(false));
    })
    .catch(err => {
      // dispatch(loading(false));
      dispatch(error(err.message || 'ERROR'));
    });

export const removeUserToken = () => dispatch =>
  AsyncStorage.removeItem('@UserAuth')
    .then(data => {
      // dispatch(loading(false));
      dispatch(removeToken({}));
    })
    .catch(err => {
      // dispatch(loading(false));
      dispatch(error(err.message || 'ERROR'));
    });
