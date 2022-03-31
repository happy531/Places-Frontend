import React from "react";
import Link from "next/link";
import { Button } from "@mui/material";
import { useAuth } from "../../../hooks/auth-hook";

import classes from "./PlaceError.module.scss";

interface Props {
  message: string;
}

const PlaceError: React.FC<Props> = ({ message }) => {
  const { token } = useAuth();

  return (
    <>
      <div className={classes.error}>
        <p>{message}</p>
        <Button variant="contained">
          {token ? (
            <Link href={"/place/new"}>SHARE PLACE</Link>
          ) : (
            <Link href={"/auth"}>Sign in</Link>
          )}
        </Button>
      </div>
    </>
  );
};

export default PlaceError;
