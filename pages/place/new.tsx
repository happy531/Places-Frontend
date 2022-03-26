import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";
import UploadImage from "../../components/UploadImage/UploadImage";

export default function New() {
  const [selectedImage, setSelectedImage] = useState<File>(null);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
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
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="description"
          label="Description"
          name="description"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="address"
          label="Address"
          name="address"
        />
      </Box>
    </Container>
  );
}
