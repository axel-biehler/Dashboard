import {
  Typography, Stack, Box, Divider,
} from '@mui/material';
import React from 'react';

const CityWeather = ({ data }) => (
  <Box sx={{ height: '100%' }} display="flex" flexDirection="column">
    <Typography sx={{ padding: 2, fontSize: 24, mb: 0 }} color="text.secondary" gutterBottom>
      {data.city}
    </Typography>
    <Divider />
    <Box p={2} display="flex" flexGrow={1} flexDirection="column" alignItems="center" justifyContent="space-evenly">
      <Stack direction="row" spacing={2}>
        <img style={{ maxWidth: 64, backgroundColor: '#2196f3f0', borderRadius: '100%' }} src={`http://openweathermap.org/img/wn/${data.weatherIcon}@2x.png`} alt="Weather icon" />
        <Typography variant="h2" component="div">
          {data.weather}
        </Typography>
      </Stack>
      <Typography mt={2} variant="h2" component="div">
        <b>{data.temp}</b>
        {' '}
        °C
      </Typography>
    </Box>
  </Box>
);

export default CityWeather;
