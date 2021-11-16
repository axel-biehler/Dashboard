import { Typography } from '@mui/material';
import React from 'react';

const Netsoul = ({ data }) => (
  <div>
    <Typography sx={{ fontSize: 24, mb: 0 }} color="text.secondary" gutterBottom>
      Your log time
    </Typography>
    <Typography variant="h2" component="div">
      {data.gpa}
      {' '}
      h
    </Typography>
  </div>
);

export default Netsoul;
