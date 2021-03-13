import React, { useState } from "react";
import { Provider } from "react-redux";
import { createUseStyles } from "react-jss";

import { store } from "./modules/store";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Main } from "./components/Main/Main";
import { About } from "./components/About/About";

const useStyles = createUseStyles({
  "@global": {
    "#root": {
      position: "absolute",
      width: "100vw",
      height: "100vh",
    },
    body: {
      margin: 0,
      height: "100vh",
      width: "100vw",
      position: "fixed",
      overflow: "hidden",
      top: "0",
      left: "0",
      fontFamily: "Roboto",
      fontSize: "14px",
      lineHeight: 1.35,
    },
    h1: {
      fontFamily: "Red Hat Text",
      fontWeight: "normal",
      fontSize: "20px",
      margin: "0",
    },
    h2: {
      fontFamily: "Red Hat Text",
      fontWeight: "normal",
      fontSize: "20px",
      margin: "0",
    },
    h3: {
      fontFamily: "Roboto",
      fontWeight: "normal",
      fontSize: "14px",
      color: "#393939",
      margin: "0",
    },
    a: {
      color: "#3047C8",
    },
    button: {
      fontSize: "14px",
      fontFamily: "Roboto",
    },
  },
});

function App(props) {
  // do not remove - responsible for global styling
  const classes = useStyles();
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
