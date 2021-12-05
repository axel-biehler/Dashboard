import React from 'react';
import {
  Box, Typography, Divider, Stack,
} from '@mui/material';

const RedditSub = ({ data }) => {
  const date = new Date(data.data.created_utc * 1000);

  const dateToPrint = `${date.toLocaleString('en-US', { month: 'short' })} ${date.toLocaleString('en-US', { day: 'numeric' })}, ${date.toLocaleString('en-US', { year: 'numeric' })}`;

  return (
    <Box sx={{ height: '100%' }} display="flex" flexDirection="column">
      <Stack direction="row" spacing={2}>
        <img style={{ maxWidth: 64, maxHeight: 64, padding: 10 }} src={data.data.header_img} alt="header_img" />
        <Stack direction="column" spacing={2}>
          <Typography sx={{ fontSize: 24, mb: 0 }} gutterBottom>
            {data.data.title}
          </Typography>
          <Typography sx={{ fontSize: 12, mb: 0 }} color="text.secondary" gutterBottom>
            {`/r/${data.data.display_name}`}
          </Typography>
        </Stack>
      </Stack>
      <Typography />
      <Divider />
      <Box p={1} display="flex" flexGrow={1} flexDirection="column" alignItems="center" justifyContent="space-evenly">
        <Typography sx={{ padding: 1, fontSize: 12, mb: 0 }} component="div">
          {data.data.public_description}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Typography sx={{ padding: 1, fontSize: 12, mb: 0 }} component="div">
            {`Members: ${data.data.subscribers}`}
          </Typography>
          <Typography sx={{ padding: 1, fontSize: 12, mb: 0 }} component="div">
            {`Created: ${dateToPrint}`}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default RedditSub;
