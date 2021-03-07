import React from "react";
import { connect } from "react-redux";
import { createUseStyles } from "react-jss";
import MdParser from "../utils/MdParser";

const useStyles = createUseStyles({
  splashContainer: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    zIndex: "2000",

    backgroundColor: "#0008",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  splash: {
    width: "100vw",
    maxWidth: "550px",
    height: "83vh",

    background: "#1d1d1df9",
    border: "1px solid #dcdcdc",
    padding: "2rem",
    borderRadius: "4px",

    color: "#fff",

    overflowY: "scroll",

    "& h1": {
      fontSize: 22,
    },
    "& p": {
      fontSize: 13,
      lineHeight: "1.6em",
    },
  },
  enterButton: {
    float: "right",
  },
});

const Splash = (props) => {
  const classes = useStyles(props);

  const { visible, setVisible } = props;

  if (!visible) {
    return <></>;
  }

  return (
    <div className={classes.splashContainer}>
      <div className={classes.splash}>
        <h1>Remapping Comanchería</h1>
        <p>
          Welcome to the online home of my project,{" "}
          <em>Remapping Comanchería</em>. My name is Madeleine Hill (she/her) -
          I’m an undergraduate student studying History and Computer Science at
          the Minerva Schools at KGI. Over the course of my education, I've been
          consistently surprised by how we in the United States selectively
          remember our national past, even in relatively "advanced" academic
          settings, and especially with regards to Indigenous peoples. I’ve
          developed this project to share some of my history education and apply
          it critically to US history, specifically the popular AP US History
          framework.
        </p>
        <p>
          I'd like to add something of a disclaimer. I am not Indigenous. I
          imagine many of the people accessing this digital space will not be
          either. I have attempted to tell a history of the United States which
          foregrounds the role of Indigenous peoples generally and Comanches
          particularly, exploring the ways in which they shaped and were shaped
          by that history. Nonetheless, I lack the personal experience to be the
          best person to convey the continuing significance which that history
          has to Indigenous peoples today.
        </p>
        <p>
          While I have endeavored to treat this history with the respect that it
          deserves, I am almost certain to fall short of that goal in some ways.
          However, a continuing pattern of Indigenous peoples being erased from
          US national history compels me to put the imperative of intervention
          over the goal of perfection. If this website is your first exposure to
          that kind of US history, please don't let it be your last. Many of the
          authors I cite have a personal connection to this history in a way
          that I simply do not, and are better equipped to do it justice.
        </p>
        <p>
          If you'd like to learn more about the project, click{" "}
          <a href={"./about"}>here</a> for a more thorough explanation of its
          aims, the work that went into making it, and how you can contribute.
          Given its particularly sensitive and important nature, one goal of
          this project has been to make my work accessible, accountable, and
          reusable to others. If that is relevant to you as a teacher, student,
          humanist, or human, you can find such resources there.
        </p>
        <p>
          Finally, thank you for your interest in this project. I've designed it
          in a way which provides not only particular knowledge about US history
          and related Indigenous peoples, but also general "historical thinking
          strategies" with much broader applicability. If you take the time, I
          believe you will come away with a better understanding of your own
          place in history, as well as tools for thinking critically about the
          world more generally. I hope you will engage with it thoughtfully and
          reflectively.
        </p>
        <button
          className={classes.enterButton}
          onClick={() => setVisible(false)}
        >
          Enter
        </button>
      </div>
    </div>
  );
};

export default Splash;
