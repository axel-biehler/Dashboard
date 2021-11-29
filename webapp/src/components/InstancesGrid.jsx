/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Card } from '@mui/material';
import Instance from './Instance';

const ResponsiveGridLayout = WidthProvider(Responsive);

const generateLayout = (key, is, height, width, count) => {
  const savedLayoutStr = localStorage.getItem(key);

  if (savedLayoutStr !== null) {
    const savedLayout = JSON.parse(savedLayoutStr);

    if (savedLayout.length === is.length) {
      return savedLayout;
    }
  }

  return is.map((instance, index) => ({
    i: instance._id,
    x: (index % count) * width,
    y: (index / count) * height,
    w: width,
    h: height,
  }));
};

const InstancesGrid = ({
  services, instances, deleteInstance, refreshInstances,
}) => {
  const layouts = {
    lg: generateLayout('lg', instances, 4, 4, 3),
    md: generateLayout('md', instances, 4, 4, 3),
    sm: generateLayout('sm', instances, 4, 3, 2),
    xs: generateLayout('xs', instances, 4, 2, 3),
    xxs: generateLayout('xxs', instances, 4, 2, 1),
  };

  const saveLayout = (_, l) => {
    Object.entries(l).forEach(([key, layout]) => {
      if (layout.length > 0) {
        localStorage.setItem(key, JSON.stringify(layout));
      }
    });
  };

  return (
    <ResponsiveGridLayout
      rowHeight={64}
      breakpoints={{
        lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0,
      }}
      cols={{
        lg: 12, md: 12, sm: 6, xs: 4, xxs: 2,
      }}
      layouts={layouts}
      onLayoutChange={saveLayout}
    >
      {instances.map((i) => (
        <Card key={i._id}>
          <Instance
            services={services}
            instance={i}
            deleteInstance={deleteInstance}
            refreshInstances={refreshInstances}
          />
        </Card>
      ))}
    </ResponsiveGridLayout>
  );
};

export default InstancesGrid;
