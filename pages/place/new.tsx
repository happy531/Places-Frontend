import React, { useContext, useRef, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container, Button } from "@mui/material";
import UploadImage from "../../components/UI/UploadImage/UploadImage";
import axios from "../../axios/axios";
import { AuthContext } from "../../context/auth-context";
import Header from "../../components/Header/Header";
import { useRouter } from "next/router";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";

export default function New() {
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
}
