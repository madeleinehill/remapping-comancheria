import React from "react";
import { connect } from "react-redux";
import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    top: "20px",
    width: "100vw",
    height: "50px",
    zIndex: "1000",
  },
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

const ActivityDisplay = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.contentCard}>
        <h2>{props.text}</h2>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDisplay);
