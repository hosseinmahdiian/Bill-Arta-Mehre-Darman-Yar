export const FnReducer = (state, action) => {
  switch (action.type) {
    case "Login":
      return {
        ...state,
        Login: !state.Login,
      };

    case "User":
      return {
        ...state,
        User: action.payload
      };
    default:
      break;
  }
};
export const init = {
  Login: false,
  User:''
  
};
