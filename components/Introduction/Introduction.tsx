import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Introduction = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}
    >
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
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Below you will find recently added places from all users, click{" "}
          <span style={{ fontWeight: "bold" }}>View</span> to see place location
          on map, <span style={{ fontWeight: "bold" }}>Author</span> will
          redirect you to author&apos;s profile.
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button variant="contained">Visit my Linkedin</Button>
          <Button variant="outlined">Visit my Github</Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Introduction;
