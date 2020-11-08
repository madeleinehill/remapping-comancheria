import React, { useState } from "react";
import { connect } from "react-redux";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";
import { createUseStyles } from "react-jss";
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
    "& p": {
      fontSize: "14px",
      lineHeight: "20px",
    },
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
  const { content } = props;
  const [open, setOpen] = useState(true);
  const [navIndex, setNavIndex] = useState(0);

  return (
    <div className={classes.container}>
      {open && (
        <div className={classes.contentCard}>
          {content.length ? (
            <>
              <h2>{content[navIndex].title}</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: content[navIndex].text,
                }}
              ></p>
            </>
          ) : (
            <>
              <h2>No Lesson Selected</h2>
              <p>Load a lesson from the sidebar to begin</p>
            </>
          )}
        </div>
      )}
      <div className={`${classes.contentCard} ${classes.navCard}`}>
        <div className={classes.arrowContainer}>
          <span style={{ margin: "7px", color: "#333" }}>
            Progress: {navIndex + 1}/{Object.keys(content).length}
          </span>
          <div style={{ flexGrow: 2 }}></div>
          <button
            disabled={navIndex <= 0}
            onClick={() => setNavIndex(navIndex - 1)}
          >
            <ArrowLeft />
          </button>
          <button
            disabled={navIndex >= content.length - 1}
            onClick={() => setNavIndex(navIndex + 1)}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
      <div
        style={{ display: "flex", height: "100px", justifyContent: "flex-end" }}
      >
        <img
          alt="toggle guide"
          src={
            process.env.PUBLIC_URL +
            (open ? "/book_open.svg" : "/book_closed.svg")
          }
          style={open ? {} : { width: "40px", marginRight: "10px" }}
          className={classes.toggleIcon}
          onClick={() => setOpen(!open)}
        ></img>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ content: state.content });

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Guide);
