import Head from "next/head";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import PlacesList from "../components/Place/PlacesList/PlacesList";
import Introduction from "../components/Introduction/Introduction";
import axios from "../axios/axios";

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
        <PlacesList items={items} />
        <Footer />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const { data } = await axios.get("/places");

  return {
    props: { items: data.places },
  };
}
