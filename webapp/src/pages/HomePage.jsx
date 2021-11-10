import React from 'react';
import { Fab } from '@mui/material';
import Add from '@mui/icons-material/Add';
import AppBar from '../components/AppBar';

const HomePage = () => (
  <div>
    <AppBar />
    <Fab
      color="primary"
      aria-label="add"
      sx={{
        position: 'fixed',
        right: 16,
        bottom: 16,
      }}
    >
      <Add />
    </Fab>
  </div>
);

export default HomePage;
