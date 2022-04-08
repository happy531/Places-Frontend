import React, { useState } from "react";
import Head from "next/head";
import { useAuth } from "../../hooks/auth-hook";
import { useRouter } from "next/router";
import axios from "../../axios/axios";

import UploadImage from "../../components/UI/UploadImage/UploadImage";
import Header from "../../components/Header/Header";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import { Container, Button, Box, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  title: string;
  description: string;
  address: string;
}

const NewPlacePage: React.FC = () => {
  const router = useRouter();
  const { token } = useAuth();

  const [selectedImage, setSelectedImage] = useState<File>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (inputs) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", inputs.title);
      formData.append("description", inputs.description);
      formData.append("address", inputs.address);
      formData.append("image", selectedImage);

      const { data } = await axios.post("/places", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data) await router.push("/");

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Places - Add new place</title>
        <meta name="add" content="Add new place" />
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
          onSubmit={handleSubmit(onSubmit)}
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
          <Controller
            name="title"
            control={control}
            defaultValue=""
            rules={{
              required: "Enter a non empty title.",
            }}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  type="title"
                  label="Title"
                  error={!!errors.title}
                  helperText={errors.title && errors.title.message}
                  margin="normal"
                  fullWidth
                />
              );
            }}
          />

          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{
              required: "Enter a non empty description.",
            }}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  type="description"
                  label="Description"
                  error={!!errors.description}
                  helperText={errors.description && errors.description.message}
                  margin="normal"
                  fullWidth
                />
              );
            }}
          />

          <UploadImage
            selectedImage={selectedImage}
            onSetSelectedImage={setSelectedImage}
            width={500}
            height={400}
          />

          <Controller
            name="address"
            control={control}
            defaultValue=""
            rules={{
              required: "Enter a non empty address.",
            }}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  type="address"
                  label="Address (its needed by the minimap)"
                  error={!!errors.address}
                  helperText={errors.address && errors.address.message}
                  margin="normal"
                  fullWidth
                />
              );
            }}
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
