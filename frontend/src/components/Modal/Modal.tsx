import React from 'react';
import { Modal, Box } from '@mui/material';

interface ModalComponentProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  adaptToScreen?: boolean;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ open, onClose, children, adaptToScreen = false }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 2,
          borderRadius: 1,
          width: adaptToScreen ? '90vw' : 400,
          height: adaptToScreen ? '90vh' : 'auto',
          minWidth: 300,
          border: '0px solid rgba(0, 0, 0, 0.2)', // Borde más delgado y sutil
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default ModalComponent;
