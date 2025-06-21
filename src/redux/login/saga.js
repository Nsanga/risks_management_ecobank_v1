import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import toast from 'react-hot-toast';
import { getUnauthRequest } from 'helper/api';
import { putUnauthRequest } from 'helper/api';
import { postUnauthRequest } from 'helper/api';
import { url } from 'urlLoader';

function* loginRequest(action) {
  const { userId, password } = action.payload;
  try {
    let link = `${url}/api/v1/user/login`;

    const data = yield postUnauthRequest(link, JSON.stringify({
      userId: userId,
      password: password
    }));

    if (data && data.data?.token) {
      toast.success("Connexion reussie");
      localStorage.setItem('token', data.data.token);
      const surname = data.data.user.surname || ''; // Utilise une chaîne vide si surname est undefined
      const name = data.data.user.name || ''; // Utilise une chaîne vide si name est undefined

      // Concatène les valeurs avec un espace, en évitant les espaces supplémentaires
      const username = [surname, name].filter(Boolean).join(' '); // Filtre les valeurs falsy et les joint avec un espace
      const role = data.data.user.role;

      localStorage.setItem('username', username);
      localStorage.setItem('role', role);
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