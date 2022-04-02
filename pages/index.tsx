import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
// import axios from "../axios/axios";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import PlacesList from "../components/Place/PlacesList/PlacesList";
import Introduction from "../components/Introduction/Introduction";
import PlaceError from "../components/UI/PlaceError/PlaceError";

import IfcPlaceItem from "../models/IfcPlaceItem";
import { Container } from "@mui/material";

interface Props {
  placesData: {
    places: Array<IfcPlaceItem>;
    message: string;
  };
}

const Home: React.FC<Props> = ({ placesData }) => {
  return (
    <>
      <Head>
        <title>Places - Home Page</title>
        <meta name="places app" content="places provided from users" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <Container>
          <Introduction />
          {placesData.places ? (
            <PlacesList items={placesData.places} />
          ) : (
            <PlaceError message={placesData.message} />
          )}
          <Footer />
        </Container>
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  // const { data } = await axios.get("/places");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/places`);
  const placesData = await res.json();

  return {
    props: { placesData },
  };
};
