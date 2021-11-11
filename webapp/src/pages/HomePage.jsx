import React, { useState, useEffect } from 'react';
import AppBar from '../components/AppBar';
import InstancesGrid from '../components/InstancesGrid';
import WidgetCreationModal from '../components/WidgetCreationModal';
import request from '../api/request';

const HomePage = () => {
  const [instances, setInstances] = useState([]);

  const loadInstances = async () => {
    const res = await request('/instances');
    setInstances(res.instances);
  };

  const deleteInstance = async (id) => {
    await request(`/instances/${id}`, 'DELETE');
    await loadInstances();
  };

  useEffect(loadInstances, []);

  return (
    <div>
      <AppBar />
      <WidgetCreationModal refreshInstances={loadInstances} />
      <InstancesGrid instances={instances} deleteInstance={deleteInstance} />
    </div>
  );
};

export default HomePage;
