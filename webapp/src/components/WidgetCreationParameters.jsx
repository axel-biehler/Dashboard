import React, { useState } from 'react';
import {
  Box, TextField, Typography, Button,
} from '@mui/material';

const StringParameter = ({ param, value, updateParameter }) => (
  <Box>
    <TextField
      sx={{ mt: 2 }}
      label={param.placeholder}
      fullWidth
      value={value}
      onChange={(e) => {
        updateParameter(param.name, e.target.value);
      }}
    />
  </Box>
);

const IntegerParameter = ({ param, value, updateParameter }) => (
  <Box>
    <TextField
      sx={{ mt: 2 }}
      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', type: 'number' }}
      label={param.placeholder}
      fullWidth
      value={value}
      onChange={(e) => {
        const val = parseInt(e.target.value, 10);
        updateParameter(param.name, val);
      }}
    />
  </Box>
);

const WidgetCreationParameters = ({
  services, selectedService, selectedWidget, addWidget, defaultValues,
}) => {
  const service = services.find((svc) => svc.name === selectedService);
  const widget = service.widgets.find((wd) => wd.name === selectedWidget);
  const [parameters, setParameters] = useState(defaultValues || {});

  const handleClick = () => {
    addWidget(parameters);
  };

  const updateParameter = (name, value) => {
    const copy = { ...parameters };
    copy[name] = value;
    setParameters(copy);
  };

  return (
    <Box>
      <Typography variant="subtitle2">
        Configure the
        {' '}
        {widget.displayName}
        {' '}
        widget
      </Typography>
      {widget.params.map((param) => {
        switch (param.type) {
          case 'string': return <StringParameter key={param.name} param={param} value={parameters[param.name]} updateParameter={updateParameter} />;
          case 'integer': return <IntegerParameter key={param.name} param={param} value={parameters[param.name]} updateParameter={updateParameter} />;
          default: return null;
        }
      })}
      <Button variant="contained" sx={{ mt: 3, float: 'right' }} onClick={handleClick}>Continue</Button>
    </Box>
  );
};

export default WidgetCreationParameters;
