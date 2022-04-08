import { useState, useCallback, useEffect } from "react";
import Cookies from "universal-cookie";

let logoutTimer: ReturnType<typeof setTimeout>;

const cookies = new Cookies();
export const useAuth = () => {
  const [token, setToken] = useState<string>(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date>(null);
  const [userId, setUserId] = useState<string>(null);

  const login = useCallback(
    (uid: string, token: string, expirationDate?: Date) => {
      setToken(token);
      setUserId(uid);
      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationDate(tokenExpirationDate);
      cookies.set(
        "userData",
        JSON.stringify({
          userId: uid,
          token: token,
          expiration: tokenExpirationDate.toISOString(),
        }),
        { path: "/" }
      );
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    cookies.remove("userData");
    // localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = cookies.get("userData");
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { token, login, logout, userId };
};
