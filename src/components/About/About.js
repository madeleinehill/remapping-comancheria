import React, { useState } from "react";

import { createUseStyles } from "react-jss";
import MdParser from "../../utils/MdParser";

import Navbar from "./Navbar";
import content from "./content";

const useStyles = createUseStyles({
  page: {
    background: "#1d1d1df9",
    color: "#FFF",
    width: "100vw",
    height: "100vh",

    overflowY: "auto",
  },
  main: {
    width: "100vw",

    display: "flex",
    justifyContent: "center",
  },
  body: {
    width: "100vw",
    maxWidth: "800px",
    margin: "30px",

    lineHeight: 1.5,

    fontSize: "15px",

    "& h1": {
      fontSize: "24px",
      fontWeight: "bold",
    },
    "& h2": {
      marginTop: "50px",
    },
    "& a": {
      color: "#48F",
    },
  },
});
export const About = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.page}>
      <Navbar></Navbar>
      <div className={classes.main}>
        <div className={classes.body}>
          <MdParser>{content}</MdParser>
        </div>
      </div>
    </div>
  );
};
