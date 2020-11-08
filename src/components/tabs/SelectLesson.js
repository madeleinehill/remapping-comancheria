import React, { useState } from "react";
import {
  MenuItem,
  NativeSelect,
  InputLabel,
  FormControl,
} from "@material-ui/core";

const ConfiguredSidebar = (props) => {
  const [selectedLesson, setSelectedLesson] = useState(null);

  return (
    <div style={{ minWidth: "200px" }}>
      <FormControl style={{ minWidth: "200px" }}>
        <InputLabel id="lesson-select-label">Select a lesson:</InputLabel>
        <NativeSelect
          labelId="lesson-select-label"
          id="lesson-select"
          value={selectedLesson}
          onChange={setSelectedLesson}
        >
          <option value={1}>Mapping Comanchería</option>
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default ConfiguredSidebar;
