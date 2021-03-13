import React from "react";
import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  contentCard: {
    minWidth: "250px",
    backgroundColor: "#FFF",
    borderRadius: "10px",
    padding: "15px",
    boxShadow: "0 3px 14px rgba(0,0,0,0.4)",
    opacity: "0.8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const LessonTitle = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.contentCard}>
      <h2>{props.text}</h2>
    </div>
  );
};

export default LessonTitle;
