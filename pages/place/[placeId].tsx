import React, { useContext, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container, Button } from "@mui/material";
import axios from "../../axios/axios";
import { AuthContext } from "../../context/auth-context";
import { useRouter } from "next/router";

export default function New() {
  const { token } = useContext(AuthContext);
  const router = useRouter();
  const { placeId } = router.query;

  const titleRef = useRef<HTMLInputElement>();
  const descriptionRef = useRef<HTMLInputElement>();

  // useEffect(() => {
  //   const fetchPlace = async () => {
  //     try {
  //       const { data } = await axios.get(`/places/${placeId}`);
  //     } catch (err) {}
  //   };
  //   fetchPlace();
  // }, [placeId]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(
        `/places/${placeId}`,
        {
          title: titleRef.current.value,
          description: descriptionRef.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await router.push("/");
    } catch (err) {}
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={placeUpdateSubmitHandler}
        sx={{
          width: 500,
          marginTop: 15,
          maxWidth: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <TextField
          inputRef={titleRef}
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
        />
        <TextField
          inputRef={descriptionRef}
          margin="normal"
          required
          fullWidth
          id="description"
          label="Description"
          name="description"
        />
        <Button variant="contained" type="submit" fullWidth>
          UPDATE PLACE
        </Button>
      </Box>
    </Container>
  );
}
