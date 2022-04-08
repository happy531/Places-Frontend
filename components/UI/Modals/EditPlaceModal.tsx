import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/router";
import axios from "../../../axios/axios";
import { useAuth } from "../../../hooks/auth-hook";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Alert } from "@mui/material";

interface Props {
  open: boolean;
  handleClose: () => void;
  placeId: string;
  initialTitle: string;
  initialDescription: string;
}

const EditPlaceModal: React.FC<Props> = ({
  open,
  handleClose,
  placeId,
  initialTitle,
  initialDescription,
}) => {
  const { token } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(null);

  const titleRef = useRef<HTMLInputElement>();
  const descriptionRef = useRef<HTMLInputElement>();

  const handleUpdatePlace = async () => {
    try {
      setErrorMessage(null);
      setLoading(true);

      await axios.patch(
        `/places/${placeId}`,
        {
          title: titleRef.current.value,
          description: descriptionRef.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.reload();
    } catch (err) {
      if (err.response) setErrorMessage(err.response.data.message);
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit place</DialogTitle>
      <DialogContent>
        <DialogContentText>You are editing this place.</DialogContentText>
        {errorMessage && (
          <Alert severity="error" style={{ width: "100%", margin: 5 }}>
            {errorMessage}
          </Alert>
        )}
        <TextField
          inputRef={titleRef}
          defaultValue={initialTitle}
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
        />
        <TextField
          inputRef={descriptionRef}
          defaultValue={initialDescription}
          margin="normal"
          required
          fullWidth
          id="description"
          label="Description"
          name="description"
        />
      </DialogContent>
      <DialogActions>
        {loading && <LoadingSpinner />}
        {!loading && (
          <>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleUpdatePlace}>Edit</Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default EditPlaceModal;
