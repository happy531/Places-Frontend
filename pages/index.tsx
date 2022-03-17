import Head from "next/head";
import Header from "../components/Header/Header";

export default function Home() {
  return (
    <>
      <Head>
        <title>Places Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
      </main>
    </>
  );
}
