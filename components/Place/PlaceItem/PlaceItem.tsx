import React from "react";
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

const PlaceItem: React.FC<IfcPlaceItem> = (props) => {
  const router = useRouter();
  const { userId, token } = useAuth();

  const isProfileOwner = props.creator === userId;

  const handleVisitAuthorProfile = async () => {
    await router.push(`/user/${props.creator}`);
  };

  const handleDeletePlace = async () => {
    try {
      await axios.delete(`/places/${props.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {}
  };

  const handleEditPlace = async () => {
    await router.push(`/place/${props.id}`);
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          width: 600,
          marginTop: 10,
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
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
          <Button size="small">View</Button>
          {!router.query.userId && (
            <Button size="small" onClick={handleVisitAuthorProfile}>
              Author
            </Button>
          )}
          {isProfileOwner && (
            <Button size="small" onClick={handleDeletePlace}>
              Delete
            </Button>
          )}
          {isProfileOwner && (
            <Button size="small" onClick={handleEditPlace}>
              Edit
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PlaceItem;
