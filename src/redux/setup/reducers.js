import { combineReducers } from 'redux';
import AccountReducer from 'reduxStore/accountManagement/reducer';
import ActionKRIReducer from 'reduxStore/actionKRI/reducer';
import ActionReducer from 'reduxStore/actions/reducer';
import CampaignReducer from 'reduxStore/campagne/reducer';
import ControlHistoryReducer from 'reduxStore/controlHistory/reducer';
import EntityReducer from 'reduxStore/entity/reducer';
import EntityRiskControlReducer from 'reduxStore/entityRiskControl/reducer';
import EventReducer from 'reduxStore/events/reducer';
import HistoryKRIReducer from 'reduxStore/historyKri/reducer';
import IncidentReportReducer from 'reduxStore/incident-report/reducer';
import KeyIndicatorReducer from 'reduxStore/kri/reducer';
import LoginReducer from 'reduxStore/login/reducer';
import PlateformeReducer from 'reduxStore/plateforme/reducer';
import ProfileReducer from 'reduxStore/profile/reducer';
import ReportReducer from 'reduxStore/reports/reducer';
import RiskControlReducer from 'reduxStore/riskControl/reducer';
import ServiceReducer from 'reduxStore/service/reducer';
import StatReducer from 'reduxStore/stats/reducer';
import TenantReducer from 'reduxStore/tenant/reducer';
import { UploadReducer } from 'reduxStore/uploadFile/reducer';
import UserReducer from 'reduxStore/user/reducer';
import UserGroupReducer from 'reduxStore/userGroup/reducer';

/**
 * @description combine reducers
 */
const rootReducer = combineReducers({
  PlateformeReducer,
  ServiceReducer,
  CampaignReducer,
  UserReducer,
  AccountReducer,
  LoginReducer,
  EventReducer,
  ProfileReducer,
  EntityReducer,
  UserGroupReducer,
  RiskControlReducer,
  EntityRiskControlReducer,
  ControlHistoryReducer,
  ActionReducer,
  KeyIndicatorReducer,
  HistoryKRIReducer,
  ActionKRIReducer,
  ReportReducer,
  StatReducer,
  IncidentReportReducer,
  TenantReducer,
  UploadReducer
});

export default rootReducer;
