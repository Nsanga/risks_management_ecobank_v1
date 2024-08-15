import React, { useEffect, useState } from 'react';
import Risk from './components/AddEventForm';
import Card from 'components/card/Card';
import CardDetails from './components/cardDetails';
import { connect, useDispatch } from 'react-redux';
import { listEvents } from 'redux/events/action';
import AddEventForm from './components/AddEventForm';

const Risks = ({ events, loading }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listEvents());
  }, [dispatch]);

  // Trier les événements par date de création et sélectionner les 5 plus récents
  const recentEvents = [...events]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <Card mt="100px">
      <AddEventForm />
      <CardDetails events={recentEvents} loading={loading} />
    </Card>
  );
};

const mapStateToProps = ({ EventReducer }) => ({
  events: EventReducer.events,
  loading: EventReducer.loading,
});

export default connect(mapStateToProps)(Risks);