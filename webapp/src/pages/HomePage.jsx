import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '../components/AppBar';
import InstancesGrid from '../components/InstancesGrid';
import WidgetCreationModal from '../components/WidgetCreationModal';
import request from '../api/request';

const HomePage = () => {
  const [instances, setInstances] = useState([]);
  const history = useHistory();

  const loadInstances = async () => {
    try {
      const res = await request('/instances');
      if (res === undefined) {
        history.push('/login');
        return;
      }

      setInstances(res.instances);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteInstance = async (id) => {
    await request(`/instances/${id}`, 'DELETE');
    await loadInstances();
  };

  useEffect(loadInstances, []);

  return (
    <div>
      <AppBar />
      <InstancesGrid instances={instances} deleteInstance={deleteInstance} />
      <WidgetCreationModal refreshInstances={loadInstances} />
    </div>
  );
};

export default HomePage;
