import React, { useContext, useRef, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/auth-context";
import axios from "../../axios/axios";

import { Container, Button, Box, TextField } from "@mui/material";
import UploadImage from "../../components/UI/UploadImage/UploadImage";
import Header from "../../components/Header/Header";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import Head from "next/head";

const NewPlacePage: React.FC = () => {
  const router = useRouter();
  const { token } = useContext(AuthContext);

  const [selectedImage, setSelectedImage] = useState<File>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const titleRef = useRef<HTMLInputElement>();
  const descriptionRef = useRef<HTMLInputElement>();
  const addressRef = useRef<HTMLInputElement>();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", titleRef.current.value);
      formData.append("description", descriptionRef.current.value);
      formData.append("address", addressRef.current.value);
      formData.append("image", selectedImage);

      const { data } = await axios.post("/places", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data) await router.push("/");

      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Places - Add new place</title>
        <meta name="new place" content="Add new place" />
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
          onSubmit={placeSubmitHandler}
          sx={{
            width: 500,
            marginTop: 15,
            maxWidth: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
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
          <UploadImage
            selectedImage={selectedImage}
            onSetSelectedImage={setSelectedImage}
            width={500}
            height={400}
          />
          <TextField
            inputRef={addressRef}
            margin="normal"
            required
            fullWidth
            id="address"
            label="Address"
            name="address"
          />
          {!loading ? (
            <Button variant="contained" type="submit" fullWidth>
              POST
            </Button>
          ) : (
            <LoadingSpinner />
          )}
        </Box>
      </Container>
    </>
  );
};

export default NewPlacePage;
