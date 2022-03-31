import Head from "next/head";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import PlacesList from "../components/Place/PlacesList/PlacesList";
import Introduction from "../components/Introduction/Introduction";
import axios from "../axios/axios";
import { GetServerSideProps } from "next";

export default function Home({ items }) {
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
        {items ? <PlacesList items={items} /> : <p>No places found.</p>}
        <Footer />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axios.get("/places");

  return {
    props: { items: data.places },
  };
};
