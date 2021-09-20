import { takeLatest, put, call, delay, all, select } from 'redux-saga/effects';
import {
  FetchFromLoginApi,
  FetchfromSessionApi,
  ModifyClient,
} from './FetchData';

function* loginAsync(action) {
  const authData = yield call(FetchFromLoginApi, action.value);
  yield delay(1000);
  if (authData.authToken != undefined) {
    const sessionData = yield call(FetchfromSessionApi, authData.authToken);
    yield put({ type: 'ReceiveApiData', value: sessionData });
    yield put({ type: 'ReceiveAuthToken', value: authData.authToken });
    yield put({ type: 'FailedAuthToken', value: authData, status: 'success' });
    yield delay(5000);
    yield put({ type: 'FailedAuthToken', value: authData, status: '' });
  } else {
    yield put({ type: 'FailedAuthToken', value: authData, status: 'failed' });
    yield delay(5000);
    yield put({ type: 'FailedAuthToken', value: authData, status: '' });
  }
}
const getAuthToken = (state) => state.LoginReducer.authToken;

function* asyncAPIData(action) {
  const authToken = yield select(getAuthToken);
  const ApiResponse = yield call(ModifyClient, action, authToken);
  // yield delay(5000);
  yield put({
    type: action.target,
    response: ApiResponse,
    status: 'Success',
    prevAction: action.type,
  });
  console.log('ApiResponse', ApiResponse, action.type);
}

export function* rootSaga() {
  yield all([
    takeLatest('GetLoginData', loginAsync),
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
