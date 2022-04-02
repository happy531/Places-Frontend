import * as React from "react";
import { Box, Typography, Link } from "@mui/material";

const Copyright: React.FC = () => {
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
};

const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: "background.paper", p: 8 }} component="footer">
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        Make sure you visit{" "}
        <Link
          color="inherit"
          href="https://github.com/happy531/Places-Frontend"
        >
          Github
        </Link>{" "}
        repo!
      </Typography>
      <Copyright />
    </Box>
  );
};

export default Footer;
