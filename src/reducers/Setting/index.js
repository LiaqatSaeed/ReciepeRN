const settingsReducer = (
    state = {
      info: {}
    },
    action
  ) => {
    switch (action.type) {
      case "SET_SETTINGS":
        
        return { ...state, info: action.Info };
      default:
        return state;
    }
  };
  
  export default settingsReducer;
  