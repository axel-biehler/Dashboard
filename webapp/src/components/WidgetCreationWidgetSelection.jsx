import React from 'react';
import {
  List, ListItem, ListItemText, Divider, Typography,
} from '@mui/material';

const WidgetCreationWidgetSelection = ({ services, selectedService, selectWidget }) => {
  const service = services.find((svc) => svc.name === selectedService);
  return (
    <List>
      <Typography variant="subtitle2">
        Pick a widget from the
        {' '}
        {service.displayName}
        {' '}
        service
      </Typography>
      { service.widgets.map((widget) => (
        <div key={widget.name}>
          <ListItem button onClick={() => selectWidget(widget.name)}>
            <ListItemText primary={widget.displayName} />
            <Typography variant="caption">
              {widget.description}
            </Typography>
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  );
};

export default WidgetCreationWidgetSelection;
