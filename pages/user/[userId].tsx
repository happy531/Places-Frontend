import Head from "next/head";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PlacesList from "../../components/Place/PlacesList/PlacesList";
import axios from "../../axios/axios";
import UserShowcase from "../../components/User/UserShowcase";
import { GetServerSideProps } from "next";

export default function UserProfile({ user, placesData }) {
  return (
    <>
      <Head>
        <title>Places - {user.name}</title>
        <meta name="user profile" content="User profile" />
      </Head>
      <main>
        <Header />
        <UserShowcase name={user.name} image={user.image} />
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // const { data } = await axios.get(`/places/user/${params.userId}`);

  const res = await fetch(
    `https://places-backend-nodejs.herokuapp.com/api/places/user/${params.userId}`
  );
  const placesData = await res.json();

  const { data: userData } = await axios.get(`/users/${params.userId}`);
  return {
    props: { user: userData.user, placesData },
  };
};
