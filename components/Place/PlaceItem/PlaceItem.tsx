import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import IfcPlaceItem from "../../../models/IfcPlaceItem";

const PlaceItem: React.FC<IfcPlaceItem> = (props) => {
  return (
    <li style={{ marginTop: 20 }}>
      <Card sx={{ maxWidth: 360, maxHeight: 430 }}>
        <CardMedia
          component="img"
          height="300"
          image={props.image}
          alt={props.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button size="medium" style={{ fontWeight: "bold" }}>
            view on map
          </Button>
          <Button size="medium" style={{ fontWeight: "bold" }}>
            visit author
          </Button>
          {/*<Button size="medium" style={{ fontWeight: "bold" }}>*/}
          {/*  delete*/}
          {/*</Button>*/}
          {/*<Button size="medium" style={{ fontWeight: "bold" }}>*/}
          {/*  edit*/}
          {/*</Button>*/}
        </CardActions>
      </Card>
    </li>
  );
};

export default PlaceItem;
