import React from "react";

import { Link } from "react-router-dom";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  navbar: {
    position: "sticky",
    width: "100vw",
    top: 0,
    left: 0,
    right: 0,

    display: "flex",
    justifyContent: "center",

    background: "#1d1d1df9",
    color: "#FFF",
  },
  responsiveNavbarContainer: {
    width: "100vw",
    maxWidth: "1000px",

    padding: "5px",

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  linkList: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "& > *": {
      color: "#FFF",
      textDecoration: "none",
      margin: "0 15px",
      "& :hover": {
        textDecoration: "underline",
      },
    },
  },
  go: {
    background: "#3047C8",
    padding: "10px",
    borderRadius: "10px",
  },
});

const Navbar = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.navbar}>
      <div className={classes.responsiveNavbarContainer}>
        <h2>
          Remapping <br /> Comanchería
        </h2>
        <div className={classes.linkList}>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/madeleinehill/remapping-comancheria/"
          >
            <h2>Github</h2>
          </a>
          <Link to="/">
            <div className={classes.go}>
              <h2>Go to app</h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
