import React from "react";
import { connect } from "react-redux";
import { createUseStyles } from "react-jss";
import Guide from "./Guide";
import LessonTitle from "./LessonTitle";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "column",

    position: "absolute",
    top: "0px",
    left: "0px",
    width: "100vw",
    height: "100vh",
    zIndex: "1000",

    pointerEvents: "none",
    "& > div > div": {
      pointerEvents: "auto",
    },
  },
  title: {
    display: "flex",
    justifyContent: "center",
    flex: "0 0 50px",
    padding: "15px",
  },
  activityDisplay: {
    display: "flex",
    justifyContent: "center",
    padding: "15px",
    flex: "1 0 0px",
  },
  guide: {
    display: "flex",
    justifyContent: "flex-end",
    flex: "0 0 auto",
    padding: "15px",
  },
});

const MapOverlay = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <LessonTitle text="1: Mapping Comanchería"></LessonTitle>
      </div>
      <div className={classes.activityDisplay}></div>
      <div className={classes.guide}>
        <Guide></Guide>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MapOverlay);
