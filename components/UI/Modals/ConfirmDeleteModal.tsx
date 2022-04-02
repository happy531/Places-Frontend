import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "../../../axios/axios";
import { useAuth } from "../../../hooks/auth-hook";
import { useRouter } from "next/router";

interface Props {
  open: boolean;
  placeId: string;
  handleClose: () => void;
}

const ConfirmDeleteModal: React.FC<Props> = ({
  open,
  placeId,
  handleClose,
}) => {
  const { token } = useAuth();
  const router = useRouter();

  const handleDeletePlace = async () => {
    try {
      await axios.delete(`/places/${placeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // handleCloseDeleteModal();
      router.reload();
    } catch (err) {}
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Delete place confirmation"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want delete this place? It will be irreversible.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDeletePlace} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
