import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import toast from 'react-hot-toast';
import { getUnauthRequest } from 'helper/api';
import { url } from 'urlLoader';
import { putUnauthRequest } from 'helper/api';
import { postUnauthRequest } from 'helper/api';

function* loginRequest(action) {
    const { userId, password } = action.payload;
    try {
      let link = `${url}/api/v1/user/login`;
  
      const data = yield postUnauthRequest(link, JSON.stringify({
        userId: userId,
        password: password
      }));
      console.log(data)
  
      if (data && data.data?.token ) {
        toast.success("Connexion reussie");
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('username', data.data.user.surname + " " + data.data.user.name);
        yield put({ type: types.LOGIN_SUCCESS, payload: { token: data.data.token, username: data.data.user.fullname } });
      } else {
        toast.error("Connexion echouée.");
        yield put({ type: types.LOGIN_FAILURE, payload: data.message.error });
      }
  
    } catch (error) {
      console.log(error);
      toast.error("Connexion echouée.");
      yield put({ type: types.LOGIN_FAILURE, payload: error });
    }
  }

export default function* LoginSaga() {
    yield takeLatest(types.LOGIN_REQUEST, loginRequest);
}