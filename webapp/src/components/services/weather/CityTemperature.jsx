import { Typography } from '@mui/material';
import React from 'react';

const CityTemperature = ({ data }) => (
  <div>
    <Typography sx={{ fontSize: 24, mb: 0 }} color="text.secondary" gutterBottom>
      {data.city}
    </Typography>
    <Typography variant="h2" component="div">
      {data.temp}
      {' '}
      °C
    </Typography>
  </div>
);

export default CityTemperature;
