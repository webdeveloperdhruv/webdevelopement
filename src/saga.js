import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

function* fetchData() {
  try {
    const response = yield call(axios.get, ': http://52.168.1.54:8080/api/v1/userActivities');
    yield put({ type: 'FETCH_DATA_SUCCESS', payload: response.data });
  } catch (error) {
    yield put({ type: 'FETCH_DATA_FAILURE', payload: error });
  }
}

function* rootSaga() {
  yield takeLatest('FETCH_DATA', fetchData);
}

export default rootSaga;