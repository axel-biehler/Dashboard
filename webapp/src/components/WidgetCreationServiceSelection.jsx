import React from 'react';
import {
  List, ListItem, ListItemText, Divider, Typography,
} from '@mui/material';

const WidgetCreationServiceSelection = ({ services, selectService }) => (
  <List>
    <Typography variant="subtitle2">
      Pick a service
    </Typography>
    { services.map((service) => (
      <div key={service.name}>
        <ListItem button onClick={() => selectService(service.name)}>
          <ListItemText primary={service.displayName} />
          <Typography variant="caption">
            {service.description}
          </Typography>
        </ListItem>
        <Divider />
      </div>
    ))}
  </List>
);

export default WidgetCreationServiceSelection;
