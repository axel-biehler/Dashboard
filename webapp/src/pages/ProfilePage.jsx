import React, { useState, useEffect } from 'react';
import {
  Container, Card, CardContent, Typography, TextField, Button, Box, Alert, Grid,
  AlertTitle,
} from '@mui/material';
import RedditIcon from '@mui/icons-material/Reddit';
import request from '../api/request';
import AppBar from '../components/AppBar';
import { getUsername, updateUsername } from '../api/auth';

const getProfile = async (username) => {
  const res = await request(`/profile/get?username=${username}`, 'GET');
  return res;
};

const ProfilePage = () => {
  const [username, setUsername] = useState(getUsername());
  const [disabled, setDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [profile, setProfile] = useState(null);

  const onLoad = async () => {
    const res = await getProfile(username);

    if (!res.status) {
      setErrorMessage(res.error);
    } else {
      setProfile(res.user);
    }
  };

  useEffect(onLoad, []);

  const onClickEdit = () => {
    setDisabled(false);
  };

  const onSaveClick = async () => {
    profile.username = username;
    console.log(profile);
    const res = await request('/profile/patch', 'PATCH', profile);
    if (!res.status) {
      setErrorMessage(res.error);
    } else {
      setProfile(res.updated);
      updateUsername(res.updated.username);
    }
    setDisabled(true);
  };

  const EditTemplate = () => (
    <Box textAlign="center" sx={{ mt: 3 }}>
      <Button variant="contained" onClick={onSaveClick}>Save</Button>
    </Box>
  );

  const OnlyReadTemplate = () => (
    <Box textAlign="center" sx={{ mt: 3 }}>
      <Button variant="contained" onClick={onClickEdit}>Edit</Button>
    </Box>
  );

  const removeReddit = () => {
    profile.redditId = null;
    profile.redditRefreshToken = null;
    setProfile(profile);
    console.log(profile);
  };

  const linkReddit = () => {
    const redirectUri = 'http://localhost:3000/reddit';
    const clientId = 'DQ67vBicYn-BsvRASDYUvg';

    const url = `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&`
  + `response_type=code&state=tomate&redirect_uri=${redirectUri}&duration=temporary&scope=identity`;

    const newWindow = window.open(url, '_self');

    if (newWindow) newWindow.opener = null;
  };

  const RedditLink = () => (
    <Card sx={{ mt: 5 }}>
      <Grid container spacing={5} justifyContent="center">
        <Grid item justifyContent="center">
          <RedditIcon style={{ fill: 'orange' }} fontSize="large" />
        </Grid>

        <Grid item justifyContent="center">
          <Typography variant="h4" fontSize="large">Reddit</Typography>
        </Grid>
        <Grid item>
          <Button
            disabled={disabled || profile?.redditId != null}
            variant="contained"
            color="success"
            onClick={linkReddit}
          >
            {profile?.redditId != null ? 'linked' : 'link'}
          </Button>
        </Grid>
        <Grid item>
          <Button
            disabled={disabled || profile?.redditId == null}
            variant="contained"
            color="error"
            onClick={removeReddit}
          >
            Remove

          </Button>
        </Grid>
      </Grid>
    </Card>
  );

  const Editing = (props) => {
    const { editing } = props;

    if (editing) { return <OnlyReadTemplate />; }
    return <EditTemplate />;
  };

  return (
    <div>
      <AppBar />
      <Container maxWidth="sm">
        { errorMessage !== null
          ? (
            <Alert severity="error" sx={{ mt: 1 }}>
              <AlertTitle>An error occured</AlertTitle>
              {errorMessage}
            </Alert>
          ) : null}
        <Typography variant="h2" sx={{ fontWeight: 'bold' }}> Profile </Typography>
        <TextField
          disabled={disabled}
          label="Username"
          defaultValue={username}
          variant="standard"
          fullWidth
          sx={{ mt: 3 }}
          onChange={(e) => { setUsername(e.target.value); }}
        />
        <Typography variant="h2" sx={{ fontWeight: 'bold', mt: 3 }}>Linked account</Typography>
        <RedditLink x />
        <Editing editing={disabled} />
      </Container>
    </div>
  );
};

export default ProfilePage;
