import Link from "next/link";

import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Typography from "@mui/material/Typography";

import classes from "./Header.module.scss";

const unauthenticatedHeaderNav = [
  {
    display: "Sign in",
    path: "/auth",
  },
];

const authenticatedHeaderNav = [
  {
    display: "Share place",
    path: "/new",
  },
  {
    display: "Logout",
    path: "/auth",
  },
];

const Header = () => {
  return (
    <>
      <CssBaseline />
      <AppBar>
        <Toolbar className={`${classes.header}`}>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "row",
              // justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CameraIcon sx={{ mr: 2 }} />
            <Typography variant="h6" color="inherit" noWrap>
              <Link href="/">Places App</Link>
            </Typography>
          </div>
          <Typography variant="h6" color="inherit" noWrap>
            <ul className={classes.header__nav}>
              {unauthenticatedHeaderNav.map(
                (e: { display: string; path: string }, i: number) => (
                  <li key={i}>
                    <Link href={e.path}>{e.display}</Link>
                  </li>
                )
              )}
            </ul>
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
//
// return (
//     <div className={`${classes.header} ${shrink ? classes.shrink : ""}`}>
//       <div className={`${classes.header__wrap}`}>
//         <div className={classes.logo}>
//           <Link href="/">Places</Link>
//         </div>
//         <ul className={classes.header__nav}>
//           {unauthenticatedHeaderNav.map(
//               (e: { display: string; path: string }, i: number) => (
//                   <li key={i}>
//                     <Link href={e.path}>{e.display}</Link>
//                   </li>
//               )
//           )}
//         </ul>
//       </div>
//     </div>
// );
