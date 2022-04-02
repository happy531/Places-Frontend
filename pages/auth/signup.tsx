import React, { useContext, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
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
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Header from "../../components/Header/Header";
import UploadImage from "../../components/UI/UploadImage/UploadImage";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";

interface Inputs {
  email: string;
  name: string;
  password: string;
}

const SignupPage: React.FC = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const [selectedImage, setSelectedImage] = useState<File>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (inputs) => {
    try {
      setErrorMessage(null);
      setLoading(true);

      const formData = new FormData();
      formData.append("email", inputs.email);
      formData.append("name", inputs.name);
      formData.append("password", inputs.password);
      formData.append("image", selectedImage);

      const { data } = await axios.post("/users/signup", formData);

      auth.login(data.userId, data.token);

      await router.push("/");

      setLoading(false);
    } catch (err) {
      setErrorMessage(err.response.data.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Places - Signup</title>
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
              Sign up
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
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: "Enter a valid name." }}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      type="name"
                      label="Name"
                      error={!!errors.name}
                      helperText={errors.name && errors.name.message}
                      margin="normal"
                      fullWidth
                      autoComplete="name"
                    />
                  );
                }}
              />

              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: "Enter a valid password.", minLength: 5 }}
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

              <UploadImage
                selectedImage={selectedImage}
                onSetSelectedImage={setSelectedImage}
                width={300}
                height={200}
              />

              {!loading ? (
                <>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign up
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Button>
                        <Link href={"/auth/signin"}>
                          Already have an account? Sign In
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
    </>
  );
};

export default SignupPage;
