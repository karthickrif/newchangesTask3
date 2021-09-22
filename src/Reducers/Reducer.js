const initialState = {
  loginData: {},
  signinStatus : false,
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GetLoginData':
      return {
        loginData: action.value,
        signinStatus : true,
      };
    case 'ReceiveApiData':
      return {
        loginData: state.loginData,
        sessionData: action.value,
        signinStatus : false,
      };
    case 'ReceiveAuthToken':
      return {
        loginData: state.loginData,
        sessionData: state.sessionData,
        authToken: action.value,
        signinStatus : false,
      };
    case 'FailedAuthToken':
      return {
        loginData: state.loginData,
        sessionData: state.sessionData,
        authToken: state.authToken,
        authStatus: action.status,
        authStatusData: action.value,
        signinStatus : false,
      };
    default:
      return state;
  }
};
export default LoginReducer;

