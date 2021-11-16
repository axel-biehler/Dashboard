import { Typography, Stack } from '@mui/material';
import React from 'react';

const CityWeather = ({ data }) => (
  <div>
    <Typography sx={{ fontSize: 24, mb: 0 }} color="text.secondary" gutterBottom>
      {data.city}
    </Typography>
    <Stack direction="row">
      <img style={{ maxWidth: 64 }} src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`} alt="Weather icon" />
      <Typography variant="h2" component="div">
        {data.weather}
      </Typography>
    </Stack>
  </div>
);

export default CityWeather;
