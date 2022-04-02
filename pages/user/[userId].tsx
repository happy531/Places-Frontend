import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import axios from "../../axios/axios";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PlacesList from "../../components/Place/PlacesList/PlacesList";
import UserShowcase from "../../components/User/UserShowcase";
import PlaceError from "../../components/UI/PlaceError/PlaceError";

import IfcPlaceItem from "../../models/IfcPlaceItem";
import { Container } from "@mui/material";

interface Props {
  user: { name: string; image: string };
  placesData: { places?: Array<IfcPlaceItem>; message?: string };
}

const NewPlacePage: React.FC<Props> = ({ user, placesData }) => {
  return (
    <>
      <Head>
        <title>Places - {user.name}</title>
        <meta name="user profile" content="User profile" />
      </Head>
      <Header />
      <main>
        <Container>
          <UserShowcase name={user.name} image={user.image} />
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

export default NewPlacePage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // const { data } = await axios.get(`/places/user/${params.userId}`);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/places/user/${params.userId}`
  );
  const placesData = await res.json();

  const { data: userData } = await axios.get(`/users/${params.userId}`);
  return {
    props: { user: userData.user, placesData },
  };
};
