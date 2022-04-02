import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/auth-hook";
import Link from "next/link";
import { useRouter } from "next/router";

import { Typography } from "@mui/material";
import CameraIcon from "@mui/icons-material/PhotoCamera";

import classes from "./Header.module.scss";

const Header: React.FC = () => {
  const { userId, token, logout } = useAuth();
  const { pathname } = useRouter();

  const [shrink, setShrink] = useState<boolean>(false);

  useEffect(() => {
    const shrinkHeader = () => {
      if (document.documentElement.scrollTop > 100) {
        setShrink(true);
      } else {
        setShrink(false);
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={`${classes.header} ${shrink ? classes.shrink : ""}`}>
      <div className={`${classes.header__wrap}`}>
        <div className={classes.logo}>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            <Link href="/">Places App</Link>
          </Typography>
        </div>
        <ul
          className={classes.header__nav}
          style={
            pathname === "/auth/signin" || pathname === "/auth/signup"
              ? { display: "none" }
              : {}
          }
        >
          {!token && (
            <li>
              <Link href={"/auth/signin"}>Sign in</Link>
            </li>
          )}
          {!token && (
            <li>
              <Link href={"/auth/signup"}>Sign up</Link>
            </li>
          )}
          {token && (
            <li>
              <Link href={"/place/new"}>Share place</Link>
            </li>
          )}
          {token && (
            <li>
              <Link href={`/user/${userId}`}>Your Places</Link>
            </li>
          )}
          {token && (
            <li onClick={handleLogout}>
              <Link href={`/`}>Logout</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
