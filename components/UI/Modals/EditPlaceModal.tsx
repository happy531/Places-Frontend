import React, { useContext, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AuthContext } from "../../../context/auth-context";
import { useRouter } from "next/router";
import axios from "../../../axios/axios";

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
  const { token } = useContext(AuthContext);
  const router = useRouter();

  const titleRef = useRef<HTMLInputElement>();
  const descriptionRef = useRef<HTMLInputElement>();

  const handleUpdatePlace = async () => {
    try {
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
      // await router.push("/");
      router.reload();
    } catch (err) {}
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit place</DialogTitle>
      <DialogContent>
        <DialogContentText>You are editing this place.</DialogContentText>
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleUpdatePlace}>Edit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPlaceModal;
