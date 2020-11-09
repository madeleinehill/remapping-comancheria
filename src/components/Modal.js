import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";
import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  contentCard: {
    position: "absolute",
    top: "0",
    right: "10px",
    bottom: "0",
    left: "60px",

    backgroundColor: "#FFF",
    borderRadius: "10px",
    padding: "15px",
    margin: "10px 0",
    boxShadow: "0 3px 14px rgba(0,0,0,0.4)",
    "& p": {
      fontSize: "14px",
      lineHeight: "20px",
    },
  },
});

const Modal = (props) => {
  const classes = useStyles();
  const { text } = props;

  if (!text) {
    return <></>;
  }

  return (
    <div className={classes.contentCard}>
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
};

export default Modal;
