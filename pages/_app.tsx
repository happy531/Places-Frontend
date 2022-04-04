import "../styles/globals.css";
import "leaflet/dist/leaflet.css";

import { AuthContext } from "../context/auth-context";
import { useAuth } from "../hooks/auth-hook";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const { token, login, logout, userId } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
};

export default App;
