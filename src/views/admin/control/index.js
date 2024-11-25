import React, { useEffect } from 'react'; 
import AddControl from './components/Addcontrol';
import Card from 'components/card/Card';
import ExcelReader from './components/ControlFileReader';
import { connect, useDispatch } from 'react-redux';
import { listRiskControls } from 'redux/riskControl/action';
import { listEntities } from 'redux/entitiy/action';
import { listProfiles } from 'redux/profile/action';


const Control = ({ riskControls, entities, profiles, loading }) => {
  const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listRiskControls());
        dispatch(listEntities());
        dispatch(listProfiles());
    }, [dispatch]);

  return (
    <Card mt="100px">
      <AddControl riskControls={riskControls} entities={entities} profiles={profiles} loading={loading}/>
      {/* <ExcelReader /> */}
    </Card>
  );
};

const mapStateToProps = ({ RiskControlReducer, EntityReducer, ProfileReducer }) => ({
  riskControls: RiskControlReducer.riskControls,
  entities: EntityReducer.entities,
  profiles: ProfileReducer.profiles,
  loading: RiskControlReducer.loading,
});

export default connect(mapStateToProps)(Control);
