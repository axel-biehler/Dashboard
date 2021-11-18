import { Typography, Box, Divider } from '@mui/material';
import React from 'react';

const Stock = ({ data }) => (
  <Box sx={{ height: '100%' }} display="flex" flexDirection="column">
    <Typography sx={{ padding: 2, fontSize: 24, mb: 0 }} color="text.secondary" gutterBottom>
      {data.name}
    </Typography>
    <Divider />
    <Box p={2} display="flex" flexGrow={1} flexDirection="column" alignItems="center" justifyContent="space-evenly">
      <Typography mt={2} variant="h2" component="div">
        <b>{data.price}</b>
        {' '}
        {data.currency}
      </Typography>
    </Box>
  </Box>
);

export default Stock;
