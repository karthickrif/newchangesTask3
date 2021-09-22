import { takeLatest, put, call, delay, all, select } from 'redux-saga/effects';
import {
  FetchFromLoginApi,
  FetchfromSessionApi,
  ModifyClient,
} from './FetchData';
const getAuthToken = (state) => state.LoginReducer.authToken;

function* loginAsync(action) {
  const authData = yield call(FetchFromLoginApi, action.value);
  yield delay(1000);
  if (authData.authToken != undefined) {
    const sessionData = yield call(FetchfromSessionApi, authData.authToken);
    localStorage.setItem('authToken',authData.authToken);
    yield put({ type: 'ReceiveApiData', value: sessionData });
    yield put({ type: 'ReceiveAuthToken', value: authData.authToken });
    yield put({ type: 'FailedAuthToken', value: authData, status: 'success' });
    yield delay(3000);
    yield put({ type: 'FailedAuthToken', value: authData, status: '' });
  } else {
    yield put({ type: 'FailedAuthToken', value: authData, status: 'failed' });
    yield delay(3000);
    yield put({ type: 'FailedAuthToken', value: authData, status: '' });
  }
}

function* directSignin(action){
  const sessionData = yield call(FetchfromSessionApi, action.authToken);
    yield put({ type: 'ReceiveApiData', value: sessionData });
    yield put({ type: 'ReceiveAuthToken', value: action.authToken });
    // yield put({ type: 'FailedAuthToken', value: authData, status: 'success' });
    // yield delay(3000);
    // yield put({ type: 'FailedAuthToken', value: authData, status: '' });
}
function* asyncAPIData(action) {
  try{
  const authToken = yield select(getAuthToken);
  const ApiResponse = yield call(ModifyClient, action, authToken);
  yield put({
    type: action.target,
    response: ApiResponse.status == 200 ? ApiResponse.data : '',
    status: ApiResponse.status == 200 ? 'Success' :  ApiResponse.response.data,
    prevAction: action.type,
  });
  yield delay(3000);
  yield put({
    type: action.target,
    response: ApiResponse.status == 200 ? ApiResponse.data : '',
    status: ApiResponse.status == 200 ? '' :  ApiResponse.response.data,
    prevAction: action.type,
  });
  if(ApiResponse.status != 200){
    yield delay(3000);
    yield put({
      type: action.target,
      response: ApiResponse.status == 200 ? ApiResponse.data : '',
      status:'',
      prevAction: action.type,
    });
  }
  // console.log('ApiResponseIve', ApiResponse.response, action.type);
}catch(e){
  console.log("asyncAPIDataError",e);
}
}

export function* rootSaga() {
  yield all([
    takeLatest('GetLoginData', loginAsync),
    takeLatest('directLogin', directSignin),
    takeLatest('GetClientData', asyncAPIData),
    takeLatest('GetCasesData', asyncAPIData),
    takeLatest('GetUsersData', asyncAPIData),
    takeLatest('AppendClientData', asyncAPIData),
    takeLatest('removeClientData', asyncAPIData),
    takeLatest('editClientData', asyncAPIData),
    takeLatest('AppendCasesData', asyncAPIData),
    takeLatest('removeCasesData', asyncAPIData),
    takeLatest('editCasesData', asyncAPIData),
    takeLatest('AppendUserData', asyncAPIData),
    takeLatest('RemoveUserData', asyncAPIData),
    takeLatest('EditUserData', asyncAPIData),    
  ]);
}