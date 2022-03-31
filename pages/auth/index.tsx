import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRef, useState } from "react";
import UploadImage from "../../components/UploadImage/UploadImage";
import { AuthContext } from "../../context/auth-context";
import axios from "../../axios/axios";

export default function Auth() {
  const auth = React.useContext(AuthContext);
  const [loginMode, setLoginMode] = useState<boolean>(true);

  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const nameRef = useRef<HTMLInputElement>();

  const [selectedImage, setSelectedImage] = useState<File>(null);

  const authSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loginMode) {
      try {
        const { data } = await axios.post("/users/login", {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        });

        auth.login(data.userId, data.token);

        console.log(data);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append("email", emailRef.current.value);
        formData.append("name", nameRef.current.value);
        formData.append("password", passwordRef.current.value);
        formData.append("image", selectedImage);
        console.log(formData);
        const { data } = await axios.post("/users/signup", formData);

        auth.login(data.userId, data.token);
      } catch (err) {}
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {loginMode ? "Sign in" : "Sign up"}
        </Typography>
        <Box
          component="form"
          onSubmit={authSubmitHandler}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            inputRef={emailRef}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          {!loginMode && (
            <TextField
              inputRef={nameRef}
              margin="normal"
              required
              fullWidth
              id="name"
              label="name"
              name="name"
              autoComplete="name"
              autoFocus
            />
          )}
          <TextField
            inputRef={passwordRef}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {!loginMode && (
            <UploadImage
              selectedImage={selectedImage}
              onSetSelectedImage={setSelectedImage}
            />
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loginMode ? "Sign in" : "Sign up"}
          </Button>
          <Grid container>
            <Grid item>
              {loginMode ? (
                <Button
                  onClick={() => {
                    setLoginMode(false);
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setLoginMode(true);
                  }}
                >
                  {"Already have an account? Sign In"}
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
