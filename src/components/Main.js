import React, { useState } from "react";

import { useRouteMatch, Route } from "react-router-dom";

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
  const { params } = match ? match : {};
  const { lessonID } = params ? params : {};
  const [showSplash, setShowSplash] = useState(!!lessonID ? false : true);

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
