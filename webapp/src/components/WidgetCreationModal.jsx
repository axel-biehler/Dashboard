import React, { useState } from 'react';
import {
  Card, Typography, Modal, Fab, Container, CardContent, Button,
} from '@mui/material';
import Add from '@mui/icons-material/Add';
import WidgetCreation from './WidgetCreation';

const WidgetCreationModal = ({ refreshInstances }) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const nextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    if (step === 0) {
      handleClose();
    } else {
      setStep(step - 1);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container maxWidth="md">
          <Card sx={{ minHeight: 480, mt: 12 }}>
            <CardContent>
              <Typography variant="h4">
                Add a new widget
                <Button type="text" sx={{ float: 'right' }} onClick={handlePreviousStep}>
                  {step === 0 ? 'Close' : 'Previous step' }
                </Button>
              </Typography>
              <WidgetCreation
                step={step}
                nextStep={nextStep}
                close={handleClose}
                refreshInstances={refreshInstances}
              />
            </CardContent>
          </Card>
        </Container>
      </Modal>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          right: 16,
          bottom: 16,
        }}
        onClick={handleOpen}
      >
        <Add />
      </Fab>
    </div>
  );
};

export default WidgetCreationModal;
