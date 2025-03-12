import { combineReducers } from 'redux';
import AccountReducer from 'redux/accountManagement/reducer';
import CampaignReducer from 'redux/campagne/reducer';
import ControlHistoryReducer from 'redux/controlHistory/reducer';
import EntityReducer from 'redux/entitiy/reducer';
import EntityRiskControlReducer from 'redux/entityRiskControl/reducer';
import EventReducer from 'redux/events/reducer';
import LoginReducer from 'redux/login/reducer';
import PlateformeReducer from 'redux/plateforme/reducer';
import ProfileReducer from 'redux/profile/reducer';
import RiskControlReducer from 'redux/riskControl/reducer';
import ServiceReducer from 'redux/service/reducer';
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
  ControlHistoryReducer
});

export default rootReducer;
