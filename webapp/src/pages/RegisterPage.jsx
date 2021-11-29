import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card, CardContent, Container, Typography, TextField, Button, Grid, Alert, AlertTitle,
} from '@mui/material';
import request from '../api/request';

const RegisterPage = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const redirectToLogin = () => {
    history.push('/login');
  };

  const onRegisterClicked = async () => {
    const res = await request('/auth/register', 'POST', {
      email,
      username,
      password,
    });

    setSuccess(res.status);
    setErrorMessage(res.error);
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 12 }}>
        <CardContent>
          <Typography variant="h2" sx={{ fontWeight: 'bold' }}>Register</Typography>
          <TextField
            label="Email"
            variant="filled"
            type="email"
            fullWidth
            sx={{ mt: 3 }}
            value={email}
            onChange={(e) => { setEmail(e.target.value); }}
          />
          <TextField
            label="Username"
            variant="filled"
            fullWidth
            sx={{ mt: 1 }}
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
              <Alert severity={success ? 'success' : 'error'} sx={{ mt: 1 }}>
                <AlertTitle>{success ? 'Success!' : 'An error occured'}</AlertTitle>
                {errorMessage}
              </Alert>
            ) : null}
          <Grid container spacing={2} justifyContent="flex-end" sx={{ mt: 1 }}>
            <Grid item>
              <Button variant="text" onClick={redirectToLogin}>Already have an account?</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={onRegisterClicked}>Register</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RegisterPage;
