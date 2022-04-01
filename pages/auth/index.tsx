import React, { useContext, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthContext } from "../../context/auth-context";
import axios from "../../axios/axios";

import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Header from "../../components/Header/Header";
import UploadImage from "../../components/UI/UploadImage/UploadImage";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";

export default function Auth() {
  const router = useRouter();
  const auth = useContext(AuthContext);

  const [loginMode, setLoginMode] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const nameRef = useRef<HTMLInputElement>();
  const [selectedImage, setSelectedImage] = useState<File>(null);

  const authSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loginMode) {
      try {
        setLoading(true);

        const { data } = await axios.post("/users/login", {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        });

        auth.login(data.userId, data.token);

        console.log(data);

        await router.push("/");

        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);

        const formData = new FormData();
        formData.append("email", emailRef.current.value);
        formData.append("name", nameRef.current.value);
        formData.append("password", passwordRef.current.value);
        formData.append("image", selectedImage);
        console.log(formData);
        const { data } = await axios.post("/users/signup", formData);

        auth.login(data.userId, data.token);

        await router.push("/");

        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Places - Auth</title>
        <meta name="places auth" content="places auth page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Header />
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              width: 400,
              marginTop: 5,
              maxWidth: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
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
                // error={!emailIsValid}
                // helperText={!emailIsValid && "Incorrect email address."}
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
                // error={!passwordIsValid}
                // helperText={
                //   !passwordIsValid && "Password must be at least 5 characters."
                // }
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
                  width={300}
                  height={200}
                />
              )}
              {!loading ? (
                <>
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
                </>
              ) : (
                <LoadingSpinner />
              )}
            </Box>
          </Box>
        </Container>
      </>
    </>
  );
}
