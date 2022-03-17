import React from "react";
import PlaceItem from "../PlaceItem/PlaceItem";
import IfcPlaceItem from "../../../models/IfcPlaceItem";

import classes from "./PlacesList.module.scss";

interface PlacesList {
  items: Array<IfcPlaceItem>;
}

const PlacesList: React.FC<PlacesList> = ({ items }) => {
  return (
    <ul className={classes.places_list}>
      {items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creator={place.creator}
          location={place.location}
          // onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  );
};

export default PlacesList;
