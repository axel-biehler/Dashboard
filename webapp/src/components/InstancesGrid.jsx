/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Grid } from '@mui/material';
import Instance from './Instance';

const InstancesGrid = ({ instances }) => (
  <Grid container spacing={2} sx={{ mt: 2 }}>
    {instances.map((i) => (
      <Grid item xs={12} md={3} key={i._id}>
        <Instance instance={i} />
      </Grid>
    ))}
  </Grid>
);

export default InstancesGrid;
