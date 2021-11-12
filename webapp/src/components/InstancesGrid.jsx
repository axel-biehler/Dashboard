/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Card } from '@mui/material';
import Instance from './Instance';

const ResponsiveGridLayout = WidthProvider(Responsive);

const generateLayout = (is, height, width, count) => is.map((instance, index) => ({
  i: instance._id,
  x: (index % count) * width,
  y: (index / count) * height,
  w: width,
  h: height,
}));

const InstancesGrid = ({ instances, deleteInstance }) => {
  const layouts = {
    lg: generateLayout(instances, 4, 4, 3),
    md: generateLayout(instances, 4, 4, 3),
    sm: generateLayout(instances, 4, 3, 2),
    xs: generateLayout(instances, 4, 2, 3),
    xxs: generateLayout(instances, 4, 2, 1),
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
    >
      {instances.map((i) => (
        <Card key={i._id}>
          <Instance instance={i} deleteInstance={deleteInstance} />
        </Card>
      ))}
    </ResponsiveGridLayout>
  );
};

export default InstancesGrid;
