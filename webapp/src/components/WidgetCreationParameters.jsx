import React, { useState } from 'react';
import {
  Box, TextField, Typography, Button,
} from '@mui/material';

const StringParameter = ({ param, updateParameter }) => {
  const [value, setValue] = useState('');

  return (
    <Box>
      <TextField
        sx={{ mt: 2 }}
        label={param.placeholder}
        fullWidth
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          updateParameter(param.name, e.target.value);
        }}
      />
    </Box>
  );
};

const IntegerParameter = ({ param, updateParameter }) => {
  const [value, setValue] = useState('');

  return (
    <Box>
      <TextField
        sx={{ mt: 2 }}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', type: 'number' }}
        label={param.placeholder}
        fullWidth
        value={value}
        onChange={(e) => {
          const val = parseInt(e.target.value, 10);
          setValue(val);
          updateParameter(param.name, val);
        }}
      />
    </Box>
  );
};

const WidgetCreationParameters = ({
  services, selectedService, selectedWidget, addWidget,
}) => {
  const service = services.find((svc) => svc.name === selectedService);
  const widget = service.widgets.find((wd) => wd.name === selectedWidget);
  const [parameters, setParameters] = useState({});

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
          case 'string': return <StringParameter key={param.name} param={param} updateParameter={updateParameter} />;
          case 'integer': return <IntegerParameter key={param.name} param={param} updateParameter={updateParameter} />;
          default: return null;
        }
      })}
      <Button variant="contained" sx={{ mt: 3, float: 'right' }} onClick={handleClick}>Add widget</Button>
    </Box>
  );
};

export default WidgetCreationParameters;
