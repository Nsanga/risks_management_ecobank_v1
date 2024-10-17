import React, { useEffect } from 'react'; 
import AddControl from './components/Addcontrol';
import Card from 'components/card/Card';
import ExcelReader from './components/ControlFileReader';
import { connect, useDispatch } from 'react-redux';
import { listRiskControls } from 'redux/riskControl/action';


const Control = ({ riskControls, loading }) => {
  const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listRiskControls());
    }, [dispatch]);

  return (
    <Card mt="100px">
      <AddControl riskControls={riskControls} loading={loading}/>
      {/* <ExcelReader /> */}
    </Card>
  );
};

const mapStateToProps = ({ RiskControlReducer }) => ({
  riskControls: RiskControlReducer.riskControls,
  loading: RiskControlReducer.loading,
});

export default connect(mapStateToProps)(Control);
