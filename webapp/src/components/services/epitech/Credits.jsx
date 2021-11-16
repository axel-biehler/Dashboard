import { Typography } from '@mui/material';
import React from 'react';

const Credits = ({ data }) => (
  <div>
    <Typography sx={{ fontSize: 24, mb: 0 }} color="text.secondary" gutterBottom>
      Your credits
    </Typography>
    <Typography variant="h2" component="div">
      {data.credits}
    </Typography>
  </div>
);

export default Credits;
