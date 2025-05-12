import React, { useEffect, useState } from "react";
import KriCard from "./components/KriCard";
import { connect, useDispatch } from "react-redux";
import { listEntities } from "redux/entitiy/action";
import { listProfiles } from "redux/profile/action";
import Card from "components/card/Card";

const KeyRiskIndicatorPage = ({ entities, profiles, loading }) => {
  const [selectedEntity, setSelectedEntity] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listEntities());
    dispatch(listProfiles());
  }, [dispatch]);

  return (
    <Card mt="100px">
      <KriCard
        entities={entities}
        profiles={profiles}
        loading={loading}
        selectedEntity={selectedEntity}
        setSelectedEntity={setSelectedEntity}
      />
    </Card>
  );
};

const mapStateToProps = ({ EntityReducer, ProfileReducer }) => ({
  entities: EntityReducer.entities,
  profiles: ProfileReducer.profiles,
  loading: EntityReducer.loading,
});

export default connect(mapStateToProps)(KeyRiskIndicatorPage);
