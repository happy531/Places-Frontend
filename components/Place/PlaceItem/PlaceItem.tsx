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
      <Card sx={{ maxWidth: 360, maxHeight: 460, backgroundColor: "#1E1E1E" }}>
        <CardMedia
          component="img"
          height="320"
          image={props.image}
          alt={props.title}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ color: "#FFFFFF" }}
          >
            {props.title}
          </Typography>
          <Typography variant="body2" style={{ color: "#757575" }}>
            {props.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button>view on map</Button>
          <Button style={{ fontWeight: 500 }}>visit author</Button>
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
