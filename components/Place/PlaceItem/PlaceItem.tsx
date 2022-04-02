import React, { useState } from "react";
import { useAuth } from "../../../hooks/auth-hook";
import { useRouter } from "next/router";
import axios from "../../../axios/axios";

import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
} from "@mui/material";

import IfcPlaceItem from "../../../models/IfcPlaceItem";

import classes from "./PlaceItem.module.scss";
import ConfirmDeleteModal from "../../UI/Modals/ConfirmDeleteModal";
import EditPlaceModal from "../../UI/Modals/EditPlaceModal";

const PlaceItem: React.FC<IfcPlaceItem> = (props) => {
  const router = useRouter();
  const { userId, token } = useAuth();
  const isProfileOwner = props.creator === userId;

  //visit author profile
  const handleVisitAuthorProfile = async () => {
    await router.push(`/user/${props.creator}`);
  };

  //open modal
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  //edit modal
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleDeletePlace = async () => {
    try {
      await axios.delete(`/places/${props.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // handleCloseDeleteModal();
      router.reload();
    } catch (err) {}
  };

  return (
    <>
      <ConfirmDeleteModal
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleConfirm={handleDeletePlace}
      />
      <EditPlaceModal
        open={openEditModal}
        handleClose={handleCloseEditModal}
        placeId={props.id}
        initialTitle={props.title}
        initialDescription={props.description}
      />
      <Grid item component="li">
        <Card className={classes.place}>
          <CardMedia
            component="img"
            sx={{
              height: "70%",
            }}
            image={`${process.env.NEXT_PUBLIC_BACKEND_ASSET_URL}/${props.image}`}
            alt={props.title}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h6" component="h2">
              {props.title}
            </Typography>
            <Typography>{props.description}</Typography>
          </CardContent>
          <CardActions sx={{ height: "10%" }}>
            {props.address && <Button size="small">View</Button>}
            {!router.query.userId && (
              <Button size="small" onClick={handleVisitAuthorProfile}>
                Author
              </Button>
            )}
            {isProfileOwner && (
              <Button size="small" onClick={handleOpenDeleteModal}>
                Delete
              </Button>
            )}
            {isProfileOwner && (
              <Button size="small" onClick={handleOpenEditModal}>
                Edit
              </Button>
            )}
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default PlaceItem;
