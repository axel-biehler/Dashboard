import {
  Typography, Box, Divider, CircularProgress,
} from '@mui/material';
import React from 'react';

const Infos = ({ data }) => (
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
      <Box display="flex" flexDirection="column" justifyContent="space-evenly">
        <Typography variant="h4" component="div" textAlign="center">GPA</Typography>
        <Box display="flex" flexGrow={1} flexDirection="row">
          <CircularProgress sx={{ marginTop: 'auto', marginBottom: 'auto' }} variant="determinate" value={(data.gpa / 4) * 100} />
          <Typography variant="h2" component="div">
            <Box marginLeft={2}><b>{data.gpa}</b></Box>
          </Typography>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-evenly">
        <Typography variant="h4" component="div" textAlign="center">Credits</Typography>
        <Box display="flex" flexGrow={1} flexDirection="row">
          <Typography variant="h2" component="div">
            <Box><b>{data.credits}</b></Box>
            <Divider />
            <Box>{data.objCredits}</Box>
          </Typography>
          <CircularProgress sx={{ marginTop: 'auto', marginBottom: 'auto', marginLeft: 3 }} variant="determinate" value={(data.credits / data.objCredits) * 100} />
        </Box>
      </Box>
    </Box>
  </Box>
);

export default Infos;
