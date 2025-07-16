import { combineReducers } from 'redux';
import AccountReducer from 'redux/accountManagement/reducer';
import ActionKRIReducer from 'redux/actionKRI/reducer';
import ActionReducer from 'redux/actions/reducer';
import CampaignReducer from 'redux/campagne/reducer';
import ControlHistoryReducer from 'redux/controlHistory/reducer';
import EntityReducer from 'redux/entity/reducer';
import EntityRiskControlReducer from 'redux/entityRiskControl/reducer';
import EventReducer from 'redux/events/reducer';
import HistoryKRIReducer from 'redux/historyKri/reducer';
import IncidentReportReducer from 'redux/incident-report/reducer';
import KeyIndicatorReducer from 'redux/kri/reducer';
import LoginReducer from 'redux/login/reducer';
import PlateformeReducer from 'redux/plateforme/reducer';
import ProfileReducer from 'redux/profile/reducer';
import ReportReducer from 'redux/reports/reducer';
import RiskControlReducer from 'redux/riskControl/reducer';
import ServiceReducer from 'redux/service/reducer';
import StatReducer from 'redux/stats/reducer';
import UserReducer from 'redux/user/reducer';
import UserGroupReducer from 'redux/userGroup/reducer';

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
  IncidentReportReducer
});

export default rootReducer;
