import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Map from "../../Map/index";

interface Props {
  open: boolean;
  placeTitle: string;
  coords: {
    lat: number;
    lng: number;
  };
  handleClose: () => void;
}

const MapModal: React.FC<Props> = ({
  open,
  placeTitle,
  coords: { lat, lng },
  handleClose,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{placeTitle}</DialogTitle>
      <DialogContent>
        <Map lat={lat} lng={lng} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MapModal;
