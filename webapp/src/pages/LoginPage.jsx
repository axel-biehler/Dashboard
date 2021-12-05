import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card, CardContent, Container, Typography, TextField, Button, Grid, Alert, AlertTitle, Box,
} from '@mui/material';
import request from '../api/request';
import { setToken } from '../api/auth';

const LoginPage = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const redirectToRegister = () => {
    history.push('/register');
  };

  const onLoginClicked = async () => {
    const res = await request('/auth/login', 'POST', {
      username,
      password,
    });

    if (!res.status) {
      setErrorMessage(res.error);
    } else {
      setToken(res.token);
      history.push('/home');
    }
  };

  const onLoginRedditClicked = () => {
    const redirectUri = 'http://localhost:3000/reddit';
    const clientId = 'DQ67vBicYn-BsvRASDYUvg';

    const url = `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&`
  + `response_type=code&state=tomate&redirect_uri=${redirectUri}&duration=temporary&scope=identity read mysubreddits `;

    const newWindow = window.open(url, '_self');

    if (newWindow) newWindow.opener = null;
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 12 }}>
        <CardContent>
          <Typography variant="h2" sx={{ fontWeight: 'bold' }}>Login</Typography>
          <TextField
            label="Username"
            variant="filled"
            fullWidth
            sx={{ mt: 3 }}
            value={username}
            onChange={(e) => { setUsername(e.target.value); }}
          />
          <TextField
            label="Password"
            variant="filled"
            type="password"
            fullWidth
            sx={{ mt: 1 }}
            value={password}
            onChange={(e) => { setPassword(e.target.value); }}
          />
          { errorMessage !== null
            ? (
              <Alert severity="error" sx={{ mt: 1 }}>
                <AlertTitle>An error occured</AlertTitle>
                {errorMessage}
              </Alert>
            ) : null}
          <Grid container spacing={2} justifyContent="flex-end" sx={{ mt: 1 }}>
            <Grid item>
              <Button variant="text" onClick={redirectToRegister}>New user?</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={onLoginClicked}>Login</Button>
            </Grid>
          </Grid>
          <Box textAlign="center">
            <Button variant="contained" onClick={onLoginRedditClicked}>Login with Reddit</Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginPage;
