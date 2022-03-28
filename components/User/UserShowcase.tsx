import React from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";

interface Props {
  name: string;
  image: string;
}

const UserShowcase: React.FC<Props> = ({ name, image }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="space-around"
      sx={{
        marginLeft: "auto",
        marginRight: "auto",
        width: "15%",
        backgroundColor: "lightblue",
        border: "2px solid gray",
      }}
    >
      <Avatar
        alt={name}
        src={`${process.env.NEXT_PUBLIC_BACKEND_ASSET_URL}/${image}`}
        sx={{ width: 100, height: 100, border: "1px solid black" }}
      />
      <h2>{name}</h2>
    </Grid>
  );
};

export default UserShowcase;
