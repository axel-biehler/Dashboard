import React, { useState, useEffect } from 'react';
import {
  Container, Card, Typography, TextField, Button, Box, Alert, Grid,
  AlertTitle, Modal, FormControl,
} from '@mui/material';
import RedditIcon from '@mui/icons-material/Reddit';
import request from '../api/request';
import AppBar from '../components/AppBar';
import { getUsername, setToken, updateUsername } from '../api/auth';

const getProfile = async (username) => {
  const res = await request(`/profile/get?username=${username}`, 'GET');
  return res;
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ProfilePage = () => {
  const [username, setUsername] = useState(getUsername());
  const [disabled, setDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [profile, setProfile] = useState(null);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState({
    lastPass: '',
    newPass: '',
    confirmPass: '',
  });
  const handleOpen = () => setOpen(true);

  const onLoad = async () => {
    const res = await getProfile(username);

    if (!res.status) {
      setErrorMessage(res.error);
    } else {
      setProfile(res.user);
    }
  };

  const handleChange = (prop) => (event) => {
    setPassword({ ...password, [prop]: event.target.value });
  };

  const handleEdited = (prop) => (event) => {
    event.preventDefault();
    setProfile({ ...profile, [prop]: null });
  };

  useEffect(onLoad, []);

  const onClickEdit = () => {
    setDisabled(false);
  };

  const onSaveClick = async () => {
    profile.username = username;
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
    handleEdited('redditID');
    handleEdited('redditRefreshToken');
  };

  const linkReddit = () => {
    const redirectUri = 'http://localhost:3000/reddit';
    const clientId = 'DQ67vBicYn-BsvRASDYUvg';

    const url = `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&`
  + `response_type=code&state=tomate&redirect_uri=${redirectUri}&duration=temporary&scope=identity`;

    const newWindow = window.open(url, '_self');

    if (newWindow) newWindow.opener = null;
  };

  const handleClose = () => {
    setPassword({
      lastPass: '',
      newPass: '',
      confirmPass: '',
    });
    setOpen(false);
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

  const newPassword = () => {
    handleOpen();
  };

  const cancel = () => {
    setDisabled(true);
  };

  const changePassword = async () => {
    if (profile.password) {
      const res = await request('/auth/login', 'POST', {
        username: profile.username,
        password: password.lastPass,
      });
      if (!res.status) {
        return;
      }
    }
    const resPassword = await request('/profile/password', 'PATCH', {
      username: profile.username,
      password: password.confirmPass,
    });
    if (resPassword.status) {
      setToken(resPassword.token);
      handleClose();
    }
  };

  const ModalPassword = () => (
    <div>
      <Modal
        onBackdropClick={() => {}}
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleClose}
      >
        <Box sx={style}>
          <FormControl>
            <Typography
              variant="h3"
              sx={{ fontWeight: 'bold', mt: 3 }}
            >
              Change password

            </Typography>
            {profile?.password && (
              <TextField
                label="Last password"
                fullWidth
                sx={{ mt: 3 }}
                variant="outlined"
                type="password"
                value={password.lastPass}
                onChange={handleChange('lastPass')}
              />
            )}
            <TextField
              error={password.newPass === ''}
              label="new password"
              fullWidth
              sx={{ mt: 3 }}
              variant="outlined"
              type="password"
              value={password.newPass}
              onChange={handleChange('newPass')}
            />
            <TextField
              error={password.newPass !== password.confirmPass || password.newPass === ''}
              label="Confirm new password"
              fullWidth
              sx={{ mt: 3 }}
              variant="outlined"
              type="password"
              value={password.confirmPass}
              onChange={handleChange('confirmPass')}
            />
            <Grid container spacing={5} justifyContent="center" sx={{ mt: 0.5 }}>
              <Grid item>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleClose}
                >
                  Cancel

                </Button>
              </Grid>
              <Grid item>
                <Button
                  disabled={password.newPass !== password.confirmPass || password.newPass === ''}
                  variant="contained"
                  color="success"
                  onClick={changePassword}
                >
                  Confirm
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );

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
        <Grid container spacing={5} justifyContent="center">
          <Grid item>
            <Box textAlign="center" sx={{ mt: 3 }}>
              <Button onClick={cancel}>
                Cancel

              </Button>
            </Box>
          </Grid>
          <Grid item>
            <Editing editing={disabled} />
          </Grid>
          <Grid item>
            <Box textAlign="center" sx={{ mt: 3 }}>
              <Button
                variant="contained"
                onClick={newPassword}
              >
                {profile?.password ? 'Change password' : 'Set password'}

              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <ModalPassword />
    </div>
  );
};

export default ProfilePage;
