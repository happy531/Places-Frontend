import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axios from "../../axios/axios";

import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Header from "../../components/Header/Header";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import { useAuth } from "../../hooks/auth-hook";

interface Inputs {
  email: string;
  password: string;
}

const SigninPage: React.FC = () => {
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const router = useRouter();
  const { token, login } = useAuth();

  useEffect(() => {
    setPageLoading(true);
    if (token) {
      router.replace("/");
    } else {
      setPageLoading(false);
    }
  }, [router, token]);

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (inputs) => {
    try {
      setErrorMessage(null);
      setLoading(true);

      const { data } = await axios.post("/users/login", {
        email: inputs.email,
        password: inputs.password,
      });

      login(data.userId, data.token);

      console.log(data);

      await router.push("/");

      setLoading(false);
    } catch (err) {
      if (err.response) setErrorMessage(err.response.data.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Places - Signin</title>
        <meta name="Signin" content="Signin page" />
      </Head>
      {pageLoading && <LoadingSpinner />}
      {!pageLoading && (
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
                Sign in
              </Typography>
              {errorMessage && (
                <Alert severity="error" style={{ width: "100%", margin: 5 }}>
                  {errorMessage}
                </Alert>
              )}
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 1 }}
              >
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Enter a valid email address.",
                    pattern:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, // email regex
                  }}
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        // type="email"
                        label="Email Address"
                        error={!!errors.email}
                        helperText={errors.email && errors.email.message}
                        margin="normal"
                        fullWidth
                        autoComplete="email"
                      />
                    );
                  }}
                />

                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "A minimal password length is 5.",
                    minLength: 5,
                  }}
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        type="password"
                        label="Password"
                        error={!!errors.password}
                        helperText={errors.password && errors.password.message}
                        margin="normal"
                        fullWidth
                        autoComplete="password"
                      />
                    );
                  }}
                />

                {!loading ? (
                  <>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign in
                    </Button>
                    <Grid container>
                      <Grid item>
                        <Button>
                          <Link href={"/auth/signup"}>
                            Don&apos;t have an account? Sign Up
                          </Link>
                        </Button>
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
      )}
    </>
  );
};

export default SigninPage;
