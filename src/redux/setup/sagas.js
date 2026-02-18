import { all } from 'redux-saga/effects';
import AccountSaga from 'reduxStore/accountManagement/saga';
import ActionKRISaga from 'reduxStore/actionKRI/saga';
import ActionSaga from 'reduxStore/actions/saga';
import CampaignSaga from 'reduxStore/campagne/saga';
import ControlHistorySaga from 'reduxStore/controlHistory/saga';
import EntitySaga from 'reduxStore/entity/saga';
import EntityRiskControlSaga from 'reduxStore/entityRiskControl/saga';
import EventSaga from 'reduxStore/events/saga';
import HistoryKRISaga from 'reduxStore/historyKri/saga';
import IncidentReportSaga from 'reduxStore/incident-report/saga';
import KeyIndicatorSaga from 'reduxStore/kri/saga';
import LoginSaga from 'reduxStore/login/saga';
import PlateformeSaga from 'reduxStore/plateforme/saga';
import ProfileSaga from 'reduxStore/profile/saga';
import ReportSaga from 'reduxStore/reports/saga';
import RiskControlSaga from 'reduxStore/riskControl/saga';
import ServiceSaga from 'reduxStore/service/saga';
import StatSaga from 'reduxStore/stats/saga';
import TenantSaga from 'reduxStore/tenant/saga';
import FileUploadSaga from 'reduxStore/uploadFile/saga';
import UserSaga from 'reduxStore/user/saga';
import UserGroupSaga from 'reduxStore/userGroup/saga';

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
    StatSaga(),
    IncidentReportSaga(),
    TenantSaga(),
    FileUploadSaga(),
  ]);
}
