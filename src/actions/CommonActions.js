import {Get, ApiEndpoints} from '../../data';
const error = error => ({
  type: 'ERROR',
  error,
});
const success = success => ({
  type: 'SUCCESS',
  data: success,
});

const setSettings = success => ({
  type: 'SET_SETTINGS',
  Info: success,
});

const getSettings = () => async dispatch => {
  try {
    
    let response = await Get(ApiEndpoints.settings);
    
    if (response.error) {
      return dispatch(error(response || 'ERROR'));
    } else {
      return dispatch(setSettings(response));
    }
  } catch (error) {
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

export {error, success, getSettings};
