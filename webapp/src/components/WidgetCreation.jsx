import React, { useState, useEffect } from 'react';
import request from '../api/request';
import WidgetCreationParameters from './WidgetCreationParameters';
import WidgetCreationServiceSelection from './WidgetCreationServiceSelection';
import WidgetCreationWidgetSelection from './WidgetCreationWidgetSelection';

const WidgetCreation = ({ step, nextStep, close }) => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedWidget, setSelectedWidget] = useState(null);

  const selectService = (name) => {
    setSelectedService(name);
    nextStep();
  };

  const selectWidget = (name) => {
    setSelectedWidget(name);
    nextStep();
  };

  const addWidget = (params) => {
    console.log(selectedService);
    console.log(selectedWidget);
    console.log(params);
    close();
  };

  useEffect(async () => {
    const res = await request('/services');
    setServices(res);
  }, []);

  switch (step) {
    case 0:
      return (
        <WidgetCreationServiceSelection
          services={services}
          selectService={selectService}
        />
      );
    case 1:
      return (
        <WidgetCreationWidgetSelection
          services={services}
          selectedService={selectedService}
          selectWidget={selectWidget}
        />
      );
    case 2:
      return (
        <WidgetCreationParameters
          services={services}
          selectedService={selectedService}
          selectedWidget={selectedWidget}
          addWidget={addWidget}
        />
      );
    default: return null;
  }
};

export default WidgetCreation;
