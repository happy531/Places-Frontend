import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "../../../axios/axios";
import { useAuth } from "../../../hooks/auth-hook";
import { useRouter } from "next/router";
import { Alert } from "@mui/material";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

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

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(null);

  const handleDeletePlace = async () => {
    try {
      setErrorMessage(null);
      setLoading(true);

      await axios.delete(`/places/${placeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      router.reload();
    } catch (err) {
      if (err.response) setErrorMessage(err.response.data.message);
      setLoading(false);
    }
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
        {errorMessage && (
          <Alert severity="error" style={{ width: "100%", margin: 5 }}>
            {errorMessage}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        {loading && <LoadingSpinner />}
        {!loading && (
          <>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleDeletePlace} autoFocus>
              Delete
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
