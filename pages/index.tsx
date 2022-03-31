import Head from "next/head";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import PlacesList from "../components/Place/PlacesList/PlacesList";
import Introduction from "../components/Introduction/Introduction";
import axios from "../axios/axios";
import { GetServerSideProps } from "next";

export default function Home({ placesData }) {
  return (
    <>
      <Head>
        <title>Places - Home Page</title>
        <meta name="places app" content="places provided from users" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Introduction />
        {placesData.places ? (
          <PlacesList items={placesData.places} />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh",
            }}
          >
            {placesData.message}
          </div>
        )}
        <Footer />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  // const { data } = await axios.get("/places");

  const res = await fetch(
    `https://places-backend-nodejs.herokuapp.com/api/places`
  );
  const placesData = await res.json();

  return {
    props: { placesData },
  };
};
