import React, { useContext, useRef, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container, Button } from "@mui/material";
import UploadImage from "../../components/UploadImage/UploadImage";
import axios from "../../axios/axios";
import { AuthContext } from "../../context/auth-context";

export default function New() {
  const { token } = useContext(AuthContext);

  const [selectedImage, setSelectedImage] = useState<File>(null);

  const titleRef = useRef<HTMLInputElement>();
  const descriptionRef = useRef<HTMLInputElement>();
  const addressRef = useRef<HTMLInputElement>();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", titleRef.current.value);
      formData.append("description", descriptionRef.current.value);
      formData.append("address", addressRef.current.value);
      formData.append("image", selectedImage);

      await axios.post("/places", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
        onSubmit={placeSubmitHandler}
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
        <UploadImage
          selectedImage={selectedImage}
          onSetSelectedImage={setSelectedImage}
        />
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
        <TextField
          inputRef={addressRef}
          margin="normal"
          required
          fullWidth
          id="address"
          label="Address"
          name="address"
        />
        <Button variant="contained" type="submit" fullWidth>
          POST
        </Button>
      </Box>
    </Container>
  );
}
