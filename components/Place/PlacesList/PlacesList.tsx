import React from "react";
import PlaceItem from "../PlaceItem/PlaceItem";

import { Grid, Container } from "@mui/material";

import IfcPlaceItem from "../../../models/IfcPlaceItem";

import classes from "./PlacesList.module.scss";

interface Props {
  items: Array<IfcPlaceItem>;
}

const PlacesList: React.FC<Props> = ({ items }) => {
  return (
    <Container maxWidth="sm">
      <Grid component="ul" className={classes.places}>
        {items.reverse().map((place: IfcPlaceItem) => (
          <PlaceItem
            key={place.id}
            id={place.id}
            image={place.image}
            title={place.title}
            description={place.description}
            address={place.address}
            creator={place.creator}
            location={place.location}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default PlacesList;
