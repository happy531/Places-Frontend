import React from "react";
import { Avatar, Grid } from "@mui/material";

import classes from "./UserShowcase.module.scss";

interface Props {
  name: string;
  image: string;
}

const UserShowcase: React.FC<Props> = ({ name, image }) => {
  return (
    <Grid container className={classes.showcase}>
      <Avatar
        alt={name}
        src={`${process.env.NEXT_PUBLIC_BACKEND_ASSET_URL}/${image}`}
        className={classes.avatar}
      />
      <h2>{name}</h2>
    </Grid>
  );
};

export default UserShowcase;
