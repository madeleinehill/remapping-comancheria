import React from "react";
import { connect } from "react-redux";
import { createUseStyles } from "react-jss";
import MdParser from "../../utils/MdParser";
import { SHOW_OVERLAY, HIDE_OVERLAY } from "../../modules/actions";

const useStyles = createUseStyles({
  appOverlay: {
    display: "block",
    position: "absolute",
    width: "300px",
    maxHeight: "300px",
    left: (props) =>
      window.innerWidth > props.overlay.posX + 300
        ? props.overlay.posX - 5
        : props.overlay.posX - 295,
    top: (props) =>
      window.innerHeight > props.overlay.posY + 300
        ? props.overlay.posY - 5
        : props.overlay.posY - 195,

    zIndex: "2000",

    background: "#f8f8f8",
    border: "1px solid #dcdcdc",
    padding: "1rem",
    borderRadius: "4px",
    fontSize: "90%",

    overflowY: "hidden",
  },
});

const AppOverlay = (props) => {
  const classes = useStyles(props);

  const { overlay } = props;

  if (!overlay.show) {
    return <></>;
  }

  return (
    <div className={classes.appOverlay} onMouseLeave={props.hideOverlay}>
      <MdParser noJargon>{overlay.content}</MdParser>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    overlay: state.overlay,
  };
};

const mapDispatchToProps = (dispatch) => ({
  showOverlay: () => dispatch({ type: SHOW_OVERLAY }),
  hideOverlay: () => dispatch({ type: HIDE_OVERLAY }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppOverlay);
