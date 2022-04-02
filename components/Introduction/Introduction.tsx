import React from "react";
import { Button, Stack, Typography, Container } from "@mui/material";

const Introduction = () => {
  return (
    <Container maxWidth="sm">
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        Places layout
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        Below you will find recently added places from all users, click{" "}
        <span style={{ fontWeight: "bold" }}>View</span> to see place location
        on map, <span style={{ fontWeight: "bold" }}>Author</span> will redirect
        you to author&apos;s profile.
      </Typography>
      <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
        <Button
          variant="contained"
          onClick={() => {
            window.open(
              "https://www.linkedin.com/in/j%C4%99drzej-weso%C5%82owski-2455941a4/"
            );
          }}
        >
          Visit my Linkedin
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            window.open("https://github.com/happy531");
          }}
        >
          Visit my Github
        </Button>
      </Stack>
    </Container>
  );
};

export default Introduction;
