import { Typography, Box, Divider } from '@mui/material';
import React from 'react';

const Currency = ({ data }) => (
  <Box sx={{ height: '100%' }} display="flex" flexDirection="column">
    <Typography sx={{ padding: 2, fontSize: 24, mb: 0 }} color="text.secondary" gutterBottom>
      {data.firstCurrency}
      {' '}
      /
      {' '}
      {data.secondCurrency}
    </Typography>
    <Divider />
    <Box p={2} display="flex" flexGrow={1} flexDirection="column" alignItems="center" justifyContent="space-evenly">
      <Typography mt={2} variant="h2" component="div">
        1
        {' '}
        {data.firstCurrency}
        {' '}
        =
        {' '}
        <b>
          {Math.round(data.price * 100) / 100}
        </b>
        {' '}
        {data.secondCurrency}
      </Typography>
    </Box>
  </Box>
);

export default Currency;
