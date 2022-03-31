import Head from "next/head";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PlacesList from "../../components/Place/PlacesList/PlacesList";
import axios from "../../axios/axios";
import UserShowcase from "../../components/User/UserShowcase";
import { GetServerSideProps } from "next";

export default function UserProfile({ items, user }) {
  return (
    <>
      <Head>
        <title>Places - {user.name}</title>
        <meta name="user profile" content="User profile" />
      </Head>
      <main>
        <Header />
        <UserShowcase name={user.name} image={user.image} />
        <PlacesList items={items} />
        <Footer />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data: placeData } = await axios.get(`/places/user/${params.userId}`);

  const { data: userData } = await axios.get(`/users/${params.userId}`);
  return {
    props: { items: placeData.places, user: userData.user },
  };
};
