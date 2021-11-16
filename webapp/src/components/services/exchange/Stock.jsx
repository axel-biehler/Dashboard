import { Typography } from '@mui/material';
import React from 'react';

const Stock = ({ data }) => (
  <div>
    <Typography sx={{ fontSize: 24, mb: 0 }} color="text.secondary" gutterBottom>
      {data.name}
    </Typography>
    <Typography variant="h2" component="div">
      {data.price}
      {' '}
      {data.currency}
    </Typography>
  </div>
);

export default Stock;
