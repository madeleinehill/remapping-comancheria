import React, { useState } from "react";
import { connect } from "react-redux";

import { FETCH_LESSON, SET_INDEX } from "../../modules/actions";
import { SUCCESS } from "../../utils/constants";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  mainSeq: { padding: "10px" },
  numLabel: {
    cursor: "pointer",

    "&:hover": {
      color: "#eee",
    },

    "& > div": {
      display: "inline-flex",
      borderRadius: "50%",
      width: "16px",
      height: "16px",
      padding: "8px",

      border: "2px solid #666",
      alignItems: "center",
      justifyContent: "center",
    },
    "&:not(:first-child)::before": {
      content: '""',
      display: "block",
      margin: "3px 17px",
      width: "0px",
      height: "5px",
      border: "1px solid #666",
    },
  },
  selectedLabel: {
    color: "#fff",
    "& > div": {
      background: "#3047C8",
      border: "2px solid #3047C8",
      color: "#fff",
    },
  },
  circleWrapper: {
    "&::before": {
      content: '""',
      display: "block",
      margin: "3px 17px",
      width: "0px",
      height: "5px",
      border: "1px solid #666",
    },
  },
  circle: {
    display: "block",
    width: 10,
    height: 10,
    margin: "0 11px",
    borderRadius: "50%",
    border: "2px solid #666",
    background: "#666",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0px 0px 5px white",
      border: "2px solid #fff",
      background: "#fff",
    },
  },
  completedCircleWrapper: {
    "& > div": {
      border: "2px solid #fff",
      background: "#fff",
    },
    "&::before": {
      border: "1px solid #fff",
    },
  },
});

const ConfiguredSidebar = (props) => {
  const { currentLesson, availableLessons, loadLesson, setIndex } = props;
  const currentLessonValue = currentLesson.src;

  const classes = useStyles();

  const handleSubmit = (id) => {
    loadLesson(id);
    props.handleClose();
  };

  return (
    <div style={{ minWidth: "200px", padding: "10px" }}>
      <h2>Remapping Comanchería:</h2>
      {/* <p>{currentLesson.name ? currentLesson.name : "No lesson selected"}</p> */}
      <div className={classes.mainSeq}>
        {availableLessons.loadingStatus === SUCCESS && [
          ...availableLessons.lessons.map((l, i) =>
            `${currentLessonValue}` === l.src ? (
              <>
                <h2
                  className={`${classes.numLabel} ${classes.selectedLabel}`}
                  value={l.src}
                  key={i}
                >
                  <div>{i + 1}</div> {l.name}
                </h2>
                {Object.keys(currentLesson.content).map((n, j) => (
                  <div
                    className={`${classes.circleWrapper} ${
                      currentLesson.currentIndex >= j
                        ? classes.completedCircleWrapper
                        : ""
                    }`}
                    key={`li ${j}`}
                  >
                    <div
                      className={classes.circle}
                      onClick={() => setIndex(j)}
                    ></div>
                  </div>
                ))}
              </>
            ) : (
              <h2
                className={classes.numLabel}
                value={l.src}
                onClick={() => handleSubmit(l.src)}
                key={i}
              >
                <div>{i + 1}</div> {l.name}
              </h2>
            ),
          ),
        ]}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentLesson: state.currentLesson,
  availableLessons: state.availableLessons,
});

const mapDispatchToProps = (dispatch) => ({
  loadLesson: (src) => dispatch({ type: FETCH_LESSON, value: src }),
  setIndex: (value) => dispatch({ type: SET_INDEX, value: value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfiguredSidebar);
