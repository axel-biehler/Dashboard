import React, { useState } from 'react';
import request from '../api/request';
import WidgetCreationParameters from './WidgetCreationParameters';
import WidgetCreationServiceSelection from './WidgetCreationServiceSelection';
import WidgetCreationWidgetSelection from './WidgetCreationWidgetSelection';

const WidgetCreation = ({
  services, step, nextStep, close, refreshInstances,
}) => {
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

  const addWidget = async (params) => {
    const res = await request('/instances', 'POST', {
      service: selectedService,
      widget: selectedWidget,
      params,
    });

    if (res.status) {
      refreshInstances();
      close();
      return;
    }
    console.log(res.error);
  };

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
