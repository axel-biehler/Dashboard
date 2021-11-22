/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  Card, Typography, Modal, Container, CardContent, Button, Box,
} from '@mui/material';
import WidgetCreationParameters from './WidgetCreationParameters';
import request from '../api/request';

const InstanceParamsModal = ({
  instance, services, refreshInstances, refreshInstanceData, status, close,
}) => {
  const addWidget = async (params) => {
    const res = await request(`/instances/${instance._id}`, 'POST', params);
    if (res.status) {
      refreshInstances();
      refreshInstanceData();
      close();
    }
  };

  return (
    <div>
      <Modal
        open={status}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container maxWidth="md">
          <Card sx={{ minHeight: 480, mt: 12 }}>
            <CardContent>
              <Typography variant="h4">
                Edit your widget
                <Button type="text" sx={{ float: 'right' }} onClick={close}>
                  Close
                </Button>
              </Typography>
              <Box>
                <WidgetCreationParameters
                  services={services}
                  selectedService={instance.service}
                  selectedWidget={instance.widget}
                  addWidget={addWidget}
                  defaultValues={instance.params}
                />
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Modal>
    </div>
  );
};

export default InstanceParamsModal;
