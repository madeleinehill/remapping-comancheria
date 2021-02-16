import React, { useState } from "react";
// import { Sidebar, Tab } from "react-leaflet-sidebarv2";
import {
  ProSidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

import { createUseStyles } from "react-jss";
import SelectLesson from "./tabs/SelectLesson";

const useStyles = createUseStyles((theme) => ({
  sidebar: {
    width: 256,
    height: "100%",
  },
  sidebarLink: {
    display: "block",
    padding: "16px 0px",
    color: "#757575",
    textDecoration: "none",
  },
  divider: {
    margin: "8px 0",
    height: 1,
    backgroundColor: "#757575",
  },
  content: {
    padding: "16px",
    height: "100%",
    backgroundColor: "white",
  },
}));

const ConfiguredSidebar = (props) => {
  const classes = useStyles(props);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const onSetSidebarOpen = (id) => {
    setOpen(!open);
    setSelected(open ? null : id);
  };

  return (
    <ProSidebar
      sidebar={<b>Sidebar content</b>}
      id="sidebar"
      open={true}
      selected={selected}
      onSetOpen={onSetSidebarOpen}
      className={classes.sidebar}
    >
      <SidebarContent>
        <SelectLesson handleClose={onSetSidebarOpen}></SelectLesson>
      </SidebarContent>
      <SidebarFooter>
        <p style={{ float: "right", padding: "5px" }}>
          Created by Madeleine Hill, 2021
        </p>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default ConfiguredSidebar;
