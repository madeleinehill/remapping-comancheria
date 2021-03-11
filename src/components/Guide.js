import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";
import { createUseStyles } from "react-jss";
import MdParser from "../utils/MdParser";
const useStyles = createUseStyles({
  container: {
    maxWidth: "400px",
  },
  toggleIcon: {
    width: "100px",
    height: "100px",
    cursor: "pointer",
  },
  contentCard: {
    minWidth: "250px",
    backgroundColor: "#FFF",
    borderRadius: "10px",
    padding: "15px",
    margin: "10px 0",
    boxShadow: "0 3px 14px rgba(0,0,0,0.4)",
  },
  navCard: {
    opacity: "0.8",
  },
  arrowContainer: {
    display: "flex",
    alignItems: "center",
    fontSize: "12px",
    "& button": {
      width: "25px",
      height: "25px",
      padding: "0",
      borderRadius: "5px",
      cursor: "pointer",
      "&:disabled": {
        backgroundColor: "#DDD",
        color: "#333",
        cursor: "default",
      },
    },
  },
});

const Guide = (props) => {
  const classes = useStyles();
  const { text, navIndex, maxIndex, incrementIndex, decrementIndex } = props;

  return (
    <div className={classes.container}>
      {!!text && (
        <div className={classes.contentCard}>
          <MdParser>{text}</MdParser>
        </div>
      )}
      <div className={`${classes.contentCard} ${classes.navCard}`}>
        <div className={classes.arrowContainer}>
          <p style={{ margin: "7px", color: "#333" }}>
            Progress: {navIndex}/{maxIndex}
          </p>
          <div style={{ flexGrow: 2 }}></div>
          <button disabled={navIndex <= 1} onClick={decrementIndex}>
            <ArrowLeft />
          </button>
          <button disabled={navIndex >= maxIndex} onClick={incrementIndex}>
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Guide;
