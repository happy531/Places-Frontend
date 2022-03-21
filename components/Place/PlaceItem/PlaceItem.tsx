import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import IfcPlaceItem from "../../../models/IfcPlaceItem";
import Grid from "@mui/material/Grid";

const PlaceItem: React.FC<IfcPlaceItem> = (props) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            // 16:9
            // pt: "56.25%",
            height: "75%",
          }}
          image={props.image}
          alt={props.title}
        />
        <CardContent sx={{ flexGrow: 1, height: "10%" }}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography>{props.description}</Typography>
        </CardContent>
        <CardActions sx={{ height: "10%" }}>
          <Button size="small">View</Button>
          <Button size="small">Author</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PlaceItem;
