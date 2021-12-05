import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Alert, AlertTitle } from '@mui/material';
import request from '../api/request';
import { getUsername, setToken } from '../api/auth';

const RedditPage = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();

  const onLoad = async () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const { code, err, state } = params;

    if (state === 'tomate' && !err) {
      const res = await request(`/auth/reddit/login?name=${getUsername()}`, 'POST', { code });
      if (!res.status) {
        setErrorMessage(res.err);
      } else {
        setToken(res.token);
        history.push('/home');
      }
    }
  };

  useEffect(onLoad, []);

  return (
    <span>
      { errorMessage !== null
        ? (
          <Alert severity="error" sx={{ mt: 1 }}>
            <AlertTitle>An error occured</AlertTitle>
            {errorMessage}
          </Alert>
        ) : null}
    </span>
  );
};

export default RedditPage;
