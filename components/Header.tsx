import React, { useEffect, useState } from "react";
import Link from "next/link";

import classes from "./Header.module.scss";

const headerNav = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Your profile",
    path: "/",
  },
  {
    display: "Add place",
    path: "/new",
  },
];

const Header = () => {
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

  return (
    <div className={`${classes.header} ${shrink ? classes.shrink : ""}`}>
      <div className={`${classes.header__wrap}`}>
        <div className={classes.logo}>
          <Link href="/">Places</Link>
        </div>
        <ul className={classes.header__nav}>
          {headerNav.map((e: { display: string; path: string }, i: number) => (
            <li key={i}>
              <Link href={e.path}>{e.display}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
