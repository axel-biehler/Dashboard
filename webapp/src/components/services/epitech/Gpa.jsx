import { Typography } from '@mui/material';
import React from 'react';

const Gpa = ({ data }) => (
  <div>
    <Typography sx={{ fontSize: 24, mb: 0 }} color="text.secondary" gutterBottom>
      Your GPA
    </Typography>
    <Typography variant="h2" component="div">
      {data.gpa}
    </Typography>
  </div>
);

export default Gpa;
