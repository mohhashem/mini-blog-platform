"use client";

import { Modal, Box, Typography, Button } from "@mui/material";

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal = ({ open, onClose, onConfirm }: ConfirmDeleteModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
            position: 'center',
          width: 400,
          mx: "auto",
          mt: 20,
          p: 4,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" mb={2}>
          Confirm Deletion
        </Typography>
        <Typography variant="body2" mb={3}>
          Are you sure you want to delete this post? This action cannot be undone.
        </Typography>
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={onConfirm}>
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmDeleteModal;
