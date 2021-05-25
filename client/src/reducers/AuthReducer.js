const initialState = {};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LoginSuccess":
      return {
          ...state,
          user: {...action.payload}
      };
    case "LoginFailed":
      return state - 1;
    default:
      return state;
  }
};

export default authReducer;
