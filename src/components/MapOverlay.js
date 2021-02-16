import React from "react";
import { connect } from "react-redux";
import { createUseStyles } from "react-jss";

import { SUCCESS, LOADING, FAILED } from "../utils/constants";
import { INCREMENT_INDEX, DECREMENT_INDEX } from "../modules/actions";

import Guide from "./Guide";
import Modal from "./Modal";
import LessonTitle from "./LessonTitle";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "column",

    position: "absolute",
    top: "0",
    left: "0",
    bottom: "0",
    right: "0",
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
  modalContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    flex: "1 0 0px",
  },
  guide: {
    display: "flex",
    justifyContent: "flex-end",
    flex: "0 0 auto",
    padding: "15px",
  },
  transluscentBlocker: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "#0008",
    pointerEvents: "auto",
  },
});

const MapOverlay = (props) => {
  const classes = useStyles();

  const { currentLesson, incrementIndex, decrementIndex } = props;
  const { loadingStatus, currentIndex, content, name } = currentLesson;

  const modalContent =
    content[currentIndex] &&
    content[currentIndex].loadingStatus === SUCCESS &&
    content[currentIndex].modal
      ? content[currentIndex].modal.text === "MAIN"
        ? content[currentIndex].main
        : content[currentIndex].modal.text
      : undefined;

  const cardContent =
    content[currentIndex] &&
    content[currentIndex].loadingStatus === SUCCESS &&
    content[currentIndex].card
      ? content[currentIndex].card.text === "MAIN"
        ? content[currentIndex].main
        : content[currentIndex].card.text
      : undefined;

  if (loadingStatus === LOADING) {
    return (
      <div className={classes.container}>
        <div className={classes.title}>
          <LessonTitle text="Loading Lesson..."></LessonTitle>
        </div>
        <div className={classes.modalContainer}></div>
        <div className={classes.guide}>
          <Guide
            text={"## Lesson Loading..."}
            navIndex={0}
            maxIndex={0}
            incrementIndex={() => {}}
            decrementIndex={() => {}}
            hasCard={true}
          ></Guide>
        </div>
      </div>
    );
  }

  if (loadingStatus === FAILED) {
    return (
      <div className={classes.container}>
        <div className={classes.title}>
          <LessonTitle text="[Error]"></LessonTitle>
        </div>
        <div className={classes.modalContainer}></div>
        <div className={classes.guide}>
          <Guide
            text={
              "## Error \n There was a problem loading the lesson. Try selected another one."
            }
            navIndex={0}
            maxIndex={0}
            incrementIndex={() => {}}
            decrementIndex={() => {}}
            hasCard={true}
          ></Guide>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      {content[currentIndex].type === "modal" && (
        <div className={classes.transluscentBlocker}></div>
      )}
      <div className={classes.title}>
        <LessonTitle text={name}></LessonTitle>
      </div>
      <div className={classes.modalContainer}>
        <Modal text={modalContent}></Modal>
      </div>
      <div className={classes.guide}>
        <Guide
          text={cardContent}
          navIndex={currentIndex + 1}
          maxIndex={Object.keys(content).length}
          incrementIndex={incrementIndex}
          decrementIndex={decrementIndex}
        ></Guide>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ currentLesson: state.currentLesson });

const mapDispatchToProps = (dispatch) => ({
  incrementIndex: () => dispatch({ type: INCREMENT_INDEX }),
  decrementIndex: () => dispatch({ type: DECREMENT_INDEX }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapOverlay);
