import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import IfcPlaceItem from "../../../models/IfcPlaceItem";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import { useAuth } from "../../../hooks/auth-hook";
import axios from "../../../axios/axios";

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
          image={`http://localhost:5000/${props.image}`}
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
