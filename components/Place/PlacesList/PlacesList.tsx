import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import PlaceItem from "../PlaceItem/PlaceItem";
import IfcPlaceItem from "../../../models/IfcPlaceItem";

interface Props {
  items: Array<IfcPlaceItem>;
}

const PlacesList: React.FC<Props> = ({ items }) => {
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        {items.map((place: IfcPlaceItem) => (
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
