import { all } from 'redux-saga/effects';
import AccountSaga from 'redux/accountManagement/saga';
import CampaignSaga from 'redux/campagne/saga';
import EntitySaga from 'redux/entitiy/saga';
import EventSaga from 'redux/events/saga';
import LoginSaga from 'redux/login/saga';
import PlateformeSaga from 'redux/plateforme/saga';
import ProfileSaga from 'redux/profile/saga';
import ServiceSaga from 'redux/service/saga';
import UserSaga from 'redux/user/saga';
import UserGroupSaga from 'redux/userGroup/saga';

/**
 * @description combine sagas
 */
export default function* Sagas() {
  yield all([
    PlateformeSaga(),
    ServiceSaga(),
    CampaignSaga(),
    UserSaga(),
    AccountSaga(),
    LoginSaga(),
    EventSaga(),
    ProfileSaga(),
    EntitySaga(),
    UserGroupSaga()
  ]);
}
