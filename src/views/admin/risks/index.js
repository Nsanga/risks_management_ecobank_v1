import React, { useEffect, useState } from 'react';
import Risk from './components/AddEventForm';
import Card from 'components/card/Card';
import CardDetails from './components/cardDetails';
import { connect, useDispatch } from 'react-redux';
import { listEvents } from 'redux/events/action';
import AddEventForm from './components/AddEventForm';
import { listEntities } from 'redux/entity/action';
import { listProfiles } from 'redux/profile/action';

const Risks = ({ events, loading, entities, profiles }) => {
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

  return (
    <Card mt="100px">
      <AddEventForm entities={entities} profiles={profiles} />
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