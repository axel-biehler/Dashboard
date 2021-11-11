/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, CardActions, Button, CircularProgress, Alert,
} from '@mui/material';
import Refresh from '@mui/icons-material/Refresh';
import Close from '@mui/icons-material/Close';
import CityTemperature from './services/weather/CityTemperature';
import request from '../api/request';

const INSTANCE_HEIGHT = 200;

const InstanceSwitch = ({ instance, data }) => {
  switch (instance.service) {
    case 'weather':
      switch (instance.widget) {
        case 'cityTemperature': return <CityTemperature data={data} />;
        default: return null;
      }
    default: return null;
  }
};

const Instance = ({ instance, deleteInstance }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    setData(null);

    const res = await request(`/instances/${instance.service}/${instance.widget}/${instance._id}`);
    if (res.status) {
      setData(res);
      setIsLoading(false);
    } else {
      setError(res.error);
      setIsLoading(false);
    }
  };

  const onRefreshClick = async () => {
    await loadData();
  };

  const onDeleteClick = async () => {
    deleteInstance(instance._id);
  };

  useEffect(loadData, []);

  if (isLoading) {
    return (
      <Card>
        <CardContent sx={{ height: INSTANCE_HEIGHT }}>
          <CircularProgress />
        </CardContent>
        <CardActions sx={{ float: 'right' }}>
          <Button size="small" onClick={onRefreshClick}><Refresh /></Button>
          <Button size="small" onClick={onDeleteClick}><Close /></Button>
        </CardActions>
      </Card>
    );
  }

  if (error !== null) {
    return (
      <Card>
        <CardContent sx={{ height: INSTANCE_HEIGHT }}>
          <Alert severity="error">{error}</Alert>
        </CardContent>
        <CardActions sx={{ float: 'right' }}>
          <Button size="small" onClick={onRefreshClick}><Refresh /></Button>
          <Button size="small" onClick={onDeleteClick}><Close /></Button>
        </CardActions>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent sx={{ height: INSTANCE_HEIGHT }}>
        <InstanceSwitch instance={instance} data={data} />
      </CardContent>
      <CardActions sx={{ float: 'right' }}>
        <Button size="small" onClick={onRefreshClick}><Refresh /></Button>
        <Button size="small" onClick={onDeleteClick}><Close /></Button>
      </CardActions>
    </Card>

  );
};

export default Instance;
