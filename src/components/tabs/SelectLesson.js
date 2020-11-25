import React, { useState } from "react";
import { connect } from "react-redux";
import {
  NativeSelect,
  InputLabel,
  FormControl,
  Button,
} from "@material-ui/core";

import { FETCH_LESSON } from "../../modules/actions";
import { SUCCESS } from "../../utils/constants";

const ConfiguredSidebar = (props) => {
  const { currentLesson, availableLessons, loadLesson } = props;
  const currentLessonValue = currentLesson.src;

  const [selectedLesson, setSelectedLesson] = useState(currentLessonValue);

  const handleSubmit = (id) => {
    setSelectedLesson(id);
    loadLesson(id);
    props.handleClose();
  };

  return (
    <div style={{ minWidth: "200px" }}>
      <h2>Current lesson:</h2>
      <p>{currentLesson.name ? currentLesson.name : "No lesson selected"}</p>
      <FormControl style={{ minWidth: "200px" }}>
        <InputLabel id="lesson-select-label">Select a lesson:</InputLabel>
        <NativeSelect
          labelId="lesson-select-label"
          id="lesson-select"
          value={selectedLesson}
          onChange={(e) => handleSubmit(e.target.value)}
        >
          {availableLessons.loadingStatus === SUCCESS && [
            <option value={""}>{""}</option>,
            ...availableLessons.lessons.map((l) => (
              <option value={l.src}>{l.name}</option>
            )),
          ]}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentLesson: state.currentLesson,
  availableLessons: state.availableLessons,
});

const mapDispatchToProps = (dispatch) => ({
  loadLesson: (src) => dispatch({ type: FETCH_LESSON, value: src }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfiguredSidebar);
