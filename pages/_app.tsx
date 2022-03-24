import { AuthContext } from "../context/auth-context";
import { useAuth } from "../hooks/auth-hook";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
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
}

export default MyApp;
