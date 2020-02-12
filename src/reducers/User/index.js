const userReducer = (
  state = {
    UserInfo: {}
  },
  action
) => {
  switch (action.type) {
    case "SET_USER":
      
      return { ...state, UserInfo: action.Info };
    case "UPDATE_USER":
      var temp=state.UserInfo;
      temp.IsCheck=action.Info;
      return { ...state, UserInfo:temp};
    default:
      return state;
  }
};

export default userReducer;
