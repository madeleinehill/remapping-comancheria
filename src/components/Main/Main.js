import React, { useState } from "react";

import { useRouteMatch } from "react-router-dom";

import Map from "./Map";
import Sidebar from "./Sidebar";
import MapOverlay from "./MapOverlay";
import AppOverlay from "./AppOverlay";
import Splash from "./Splash";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  splitVertical: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    position: "relative",
  },
});
export const Main = (props) => {
  const classes = useStyles();

  const match = useRouteMatch("/lesson/:lessonID/index/:index");
  const matchNoIndex = useRouteMatch("/lesson/:lessonID/");
  const [showSplash, setShowSplash] = useState(
    !!match || !!matchNoIndex ? false : true,
  );

  return (
    <>
      <div className={classes.splitVertical}>
        <Sidebar></Sidebar>
        <div style={{ flex: "2 0 0", position: "relative" }}>
          <Map />
          <MapOverlay></MapOverlay>
        </div>
      </div>
      <AppOverlay></AppOverlay>
      <Splash visible={showSplash} setVisible={setShowSplash}></Splash>
    </>
  );
};
