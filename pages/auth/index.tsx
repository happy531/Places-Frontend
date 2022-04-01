import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRef, useState } from "react";
import UploadImage from "../../components/UI/UploadImage/UploadImage";
import { AuthContext } from "../../context/auth-context";
import axios from "../../axios/axios";
import { useRouter } from "next/router";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import Header from "../../components/Header/Header";
import Head from "next/head";

export default function Auth() {
  const router = useRouter();
  const auth = React.useContext(AuthContext);

  const [loginMode, setLoginMode] = useState<boolean>(true);

  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const nameRef = useRef<HTMLInputElement>();

  const [selectedImage, setSelectedImage] = useState<File>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
                // error={}
                // helperText="Incorrect email address."
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
