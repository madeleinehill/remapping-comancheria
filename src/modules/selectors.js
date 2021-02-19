import { createSelector } from "reselect";
import { SUCCESS } from "../utils/constants";

const getCurrentLesson = (state) => state.currentLesson;
const getResources = (state) => state.resources;

export const getModalContent = createSelector(
  [getCurrentLesson, getResources],
  (currentLesson, resources) => {
    const { currentIndex, content } = currentLesson;

    if (!content[currentIndex] || !content[currentIndex].modal) {
      return undefined;
    }

    const { modal } = content[currentIndex];

    if (!!modal.src) {
      return !!resources[modal.src] &&
        resources[modal.src].loadingStatus === SUCCESS
        ? resources[modal.src].value
        : "loading...";
    }

    return modal.text;
  },
);

export const getCardContent = createSelector(
  [getCurrentLesson, getResources],
  (currentLesson, resources) => {
    const { currentIndex, content } = currentLesson;

    if (!content[currentIndex] || !content[currentIndex].card) {
      return undefined;
    }

    const { card } = content[currentIndex];

    if (!!card.src) {
      return !!resources[card.src] &&
        resources[card.src].loadingStatus === SUCCESS
        ? resources[card.src].value
        : "loading...";
    }

    return card.text;
  },
);

export const getMapElements = createSelector(
  [getCurrentLesson, getResources],
  (currentLesson, resources) => {
    const { currentIndex, content, loadingStatus } = currentLesson;

    const currentContent =
      loadingStatus === SUCCESS ? content[currentIndex] : {};

    const popups = !!currentContent.popups ? currentContent.popups : [];
    // popup text from src
    const shapes = !!currentContent.shapes ? currentContent.shapes : [];
    const geojson = !!currentContent.geojson ? currentContent.geojson : {};
    const overlays = !!currentContent.overlays ? currentContent.overlays : [];

    const polygons = shapes.filter((s) => s.type === "polygon");

    const geojsonResolved = !!geojson.src
      ? !!resources[geojson.src] &&
        resources[geojson.src].loadingStatus === SUCCESS
        ? resources[geojson.src].value
        : {}
      : geojson.data;

    return { popups, overlays, polygons, geojson: geojsonResolved };
  },
);
