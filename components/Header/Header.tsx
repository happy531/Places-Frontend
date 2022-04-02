import Link from "next/link";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Typography from "@mui/material/Typography";

import classes from "./Header.module.scss";
import { useAuth } from "../../hooks/auth-hook";

const Header = () => {
  const { userId, token, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar>
      <Toolbar className={`${classes.header}`}>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            <Link href="/">Places App</Link>
          </Typography>
        </div>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          sx={{ minWidth: "20%" }}
        >
          <ul className={classes.header__nav}>
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
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
