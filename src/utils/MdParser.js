import React from "react";
import ReactMarkdown from "react-markdown";
import { connect } from "react-redux";
import jargonData from "./jargon";
import { createUseStyles } from "react-jss";
import { SET_OVERLAY_CONTENT, HIDE_OVERLAY } from "../modules/actions";

const useStyles = createUseStyles({
  jargonTerm: {
    textDecoration: "underline dotted #228be6",
    fontStyle: "italic",
    "&::after": {
      content: "?",
      fontWeight: "bold",
      display: "inline-block",
      transform: "translate(0, -0.5em)",
      fontSize: "75%",
      color: "#228be6",
      marginLeft: "3px",
    },
    "&:hover": {
      position: "relative",
      textDecoration: "none",
      cursor: "help",
    },
  },
});

const MdParser = (props) => {
  const classes = useStyles(props);

  const triggerOverlay = (content, event) => {
    props.setOverlayContent({
      posX: event.clientX,
      posY: event.clientY,
      content: content,
    });
  };

  const Jargon = (value) => {
    const jargonInfo =
      jargonData[value.node.children[0].value.toLowerCase().replace(/\W/g, "")];

    if (!jargonInfo) {
      return <em>{value.children}</em>;
    }

    return (
      <span
        className={classes.jargonTerm}
        onMouseEnter={(e) => triggerOverlay(jargonInfo, e)}
      >
        {value.children}
      </span>
    );
  };

  return (
    <div className={classes.mdContent}>
      <ReactMarkdown
        allowDangerousHtml
        renderers={{
          emphasis: props.noJargon ? undefined : Jargon,
          link: (props) => (
            <a href={props.href} target="_blank" rel="noreferrer">
              {props.children}
            </a>
          ),
        }}
        source={props.children}
      ></ReactMarkdown>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  setOverlayContent: ({ posX, posY, content }) =>
    dispatch({ type: SET_OVERLAY_CONTENT, value: { posX, posY, content } }),
  hideOverlay: () => dispatch({ type: HIDE_OVERLAY }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MdParser);
