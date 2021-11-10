import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

const NotFoundPage = () => {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <div>
      <Typography variant="h2">You are lost!</Typography>
      <Button variant="text" onClick={goBack}>Go back!</Button>
    </div>
  );
};

export default NotFoundPage;
