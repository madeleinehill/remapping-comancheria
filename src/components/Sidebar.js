import React, { useState } from "react";
import { Sidebar, Tab } from "react-leaflet-sidebarv2";

import SelectLesson from "./tabs/SelectLesson";

const ConfiguredSidebar = (props) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const toggleOpen = (id) => {
    setOpen(!open);
    setSelected(open ? null : id);
  };

  return (
    <Sidebar
      id="sidebar"
      collapsed={!open}
      selected={selected}
      onOpen={toggleOpen}
      onClose={toggleOpen}
    >
      <Tab id="home" header="Home" icon="fa fa-home">
        <SelectLesson handleClose={toggleOpen}></SelectLesson>
      </Tab>
      {/* <Tab id="settings" header="Settings" icon="fa fa-cog" anchor="bottom">
        <p>Settings dialogue.</p>
      </Tab> */}
    </Sidebar>
  );
};

export default ConfiguredSidebar;
