import React, { useContext, useRef } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/auth-context";

import axios from "../../axios/axios";
import { Container, Button, Box, TextField } from "@mui/material";
import Header from "../../components/Header/Header";
import Head from "next/head";

interface Props {
  place: {
    title: string;
    description: string;
  };
}

const EditPlacePage: React.FC<Props> = ({ place }) => {
  const { token } = useContext(AuthContext);
  const router = useRouter();
  const { placeId } = router.query;

  const titleRef = useRef<HTMLInputElement>();
  const descriptionRef = useRef<HTMLInputElement>();

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
    <>
      <Head>
        <title>Places - Edit place</title>
        <meta name="edit place" content="Edit existing place" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
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
            defaultValue={place.title}
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
          />
          <TextField
            inputRef={descriptionRef}
            defaultValue={place.description}
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
    </>
  );
};

export default EditPlacePage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // const { data } = await axios.get("/places");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/places/${params.placeId}`
  );
  const placeData = await res.json();

  return {
    props: { place: placeData.place },
  };
};
