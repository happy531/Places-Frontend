import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://www.linkedin.com/in/j%C4%99drzej-weso%C5%82owski-2455941a4/"
      >
        My Linkedin
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        Make sure you visit{" "}
        <Link
          color="inherit"
          href="https://www.linkedin.com/in/j%C4%99drzej-weso%C5%82owski-2455941a4/"
        >
          Github
        </Link>{" "}
        repo!
      </Typography>
      <Copyright />
    </Box>
  );
}
