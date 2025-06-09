import { all } from 'redux-saga/effects';
import AccountSaga from 'redux/accountManagement/saga';
import ActionKRISaga from 'redux/actionKRI/saga';
import ActionSaga from 'redux/actions/saga';
import CampaignSaga from 'redux/campagne/saga';
import ControlHistorySaga from 'redux/controlHistory/saga';
import EntitySaga from 'redux/entity/saga';
import EntityRiskControlSaga from 'redux/entityRiskControl/saga';
import EventSaga from 'redux/events/saga';
import HistoryKRISaga from 'redux/historyKri/saga';
import KeyIndicatorSaga from 'redux/kri/saga';
import LoginSaga from 'redux/login/saga';
import PlateformeSaga from 'redux/plateforme/saga';
import ProfileSaga from 'redux/profile/saga';
import ReportSaga from 'redux/reports/saga';
import RiskControlSaga from 'redux/riskControl/saga';
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
    UserGroupSaga(),
    RiskControlSaga(),
    EntityRiskControlSaga(),
    ControlHistorySaga(),
    ActionSaga(),
    KeyIndicatorSaga(),
    HistoryKRISaga(),
    ActionKRISaga(),
    ReportSaga(),
  ]);
}
