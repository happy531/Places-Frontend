import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Button from "@mui/material/Button";

import IfcPlaceItem from "../../../models/IfcPlaceItem";

const PlaceItem: React.FC<IfcPlaceItem> = (props) => {
  return (
    <li style={{ marginTop: 20 }}>
      <Card sx={{ maxWidth: 360, maxHeight: 430 }}>
        <CardMedia
          component="img"
          height="300"
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Palace_of_Culture_and_Science_20180817.jpg/800px-Palace_of_Culture_and_Science_20180817.jpg"
          alt="Paella dish"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Palace of Culture
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This impressive palace is located in Poland
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
