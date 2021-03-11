import React, { useState } from "react";
import { Provider } from "react-redux";
import { createUseStyles } from "react-jss";

import { store } from "./modules/store";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import MapOverlay from "./components/MapOverlay";
import AppOverlay from "./components/AppOverlay";
import Splash from "./components/Splash";

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
  splitVertical: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    position: "relative",
  },
});

function App(props) {
  const classes = useStyles();

  const [showSplash, setShowSplash] = useState(true);

  return (
    <Provider store={store}>
      <div className={classes.splitVertical}>
        <Sidebar></Sidebar>
        <div style={{ flex: "2 0 0", position: "relative" }}>
          <Map />
          <MapOverlay></MapOverlay>
        </div>
      </div>
      <AppOverlay></AppOverlay>
      <Splash visible={showSplash} setVisible={setShowSplash}></Splash>
    </Provider>
  );
}

export default App;
