import React from 'react';
import { Typography, Box, Divider } from '@mui/material';
import { Chart } from 'react-google-charts';

const Netsoul = ({ data }) => (
  <Box sx={{ height: '100%' }} display="flex" flexDirection="column">
    <Typography sx={{ padding: 2, fontSize: 24, mb: 0 }} color="text.secondary" gutterBottom>
      {data.name}
      {' '}
      -
      {' '}
      Epitech
      {' '}
      {data.promo}
    </Typography>
    <Divider />
    <Box p={2} display="flex" flexGrow={1} flexDirection="row" alignItems="center" justifyContent="space-evenly">
      <Chart
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={[
          ['', 'Active', 'Average'],
          ...data.netsoul,
        ]}
      />
    </Box>
  </Box>
);

export default Netsoul;
