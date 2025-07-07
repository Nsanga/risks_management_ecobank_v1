import React, { useEffect, useState } from 'react';
import Risk from './components/AddEventForm';
import Card from 'components/card/Card';
import CardDetails from './components/cardDetails';
import { connect, useDispatch } from 'react-redux';
import { listEvents } from 'redux/events/action';
import AddEventForm from './components/AddEventForm';
import { listEntities } from 'redux/entity/action';
import { listProfiles } from 'redux/profile/action';
import { Flex } from '@chakra-ui/react';
import RefreshButton from 'components/refreshButton';

const Risks = ({ events, loading, entities, profiles }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listEvents());
    dispatch(listEntities());
    dispatch(listProfiles());
  }, [dispatch]);
  console.log("events:", events)
  // Trier les événements par date de création et sélectionner les 5 plus récents
  const recentEvents = [...events]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  const handleRefresh = () => {
    // Active l'état de chargement
    setIsRefreshing(true);

    // Simule un délai avant l'actualisation (2 secondes)
    setTimeout(() => {
      dispatch(listEvents());
      setIsRefreshing(false);
    }, 1000);
  }

  return (
    <Card mt="100px">
      <Flex justifyContent="space-between">
        <RefreshButton handleRefresh={handleRefresh} isRefreshing={isRefreshing} />
        <AddEventForm entities={entities} profiles={profiles} />
      </Flex>
      <CardDetails events={recentEvents} loading={loading} />
    </Card>
  );
};

const mapStateToProps = ({ EventReducer, EntityReducer, ProfileReducer }) => ({
  profiles: ProfileReducer.profiles,
  events: EventReducer.events,
  entities: EntityReducer.entities,
  loading: EventReducer.loading,
});

export default connect(mapStateToProps)(Risks);