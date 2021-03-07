import { createSelector } from "reselect";
import { SUCCESS } from "../utils/constants";

const getCurrentLesson = (state) => state.currentLesson;
const getResources = (state) => state.resources;

export const getModalContent = createSelector(
  [getCurrentLesson, getResources],
  (currentLesson, resources) => {
    const { currentIndex, content } = currentLesson;
    const currentContent = content[currentIndex];

    if (
      !currentContent ||
      !currentContent.modal ||
      currentContent.loadingStatus !== SUCCESS ||
      !dependenciesLoaded(currentContent, resources)
    ) {
      return {};
    }

    console.log(currentContent, resources);
    console.log("resolving modal resources");
    return resolveResources(content[currentIndex].modal, resources);
  },
);

export const getCardContent = createSelector(
  [getCurrentLesson, getResources],
  (currentLesson, resources) => {
    const { currentIndex, content, loadingStatus } = currentLesson;
    const currentContent = content[currentIndex];

    if (
      !currentContent ||
      currentContent.loadingStatus !== SUCCESS ||
      !dependenciesLoaded(currentContent, resources)
    ) {
      return { text: "## Loading slide..." };
    }

    if (!currentContent.card) {
      return {};
    }
    return resolveResources(content[currentIndex].card, resources);
  },
);

export const getMapElements = createSelector(
  [getCurrentLesson, getResources],
  (currentLesson, resources) => {
    const { currentIndex, content, loadingStatus } = currentLesson;
    const currentContent = content[currentIndex];
    const emptyProps = { popups: [], geojson: [], overlays: [], zoomTo: {} };

    if (
      !currentContent ||
      currentContent.loadingStatus !== SUCCESS ||
      !dependenciesLoaded(currentContent, resources)
    ) {
      return emptyProps;
    }

    // const polygons = currentContent.shapes.filter((s) => s.type === "Polygon");

    return {
      popups: currentContent.popups
        ? resolveResources(currentContent.popups, resources)
        : [],
      geojson: currentContent.geojson
        ? resolveResources(currentContent.geojson, resources)
        : [],
      overlays: currentContent.overlays
        ? resolveResources(currentContent.overlays, resources)
        : [],
      zoomTo: !!currentContent.zoomTo ? currentContent.zoomTo : {},
    };
  },
);

function resolveResources(el, resources) {
  // if el is an object, check if there is an src attribute to resolve
  // this function should not have been called if all dependencies are not loaded

  console.log(el, resources);
  if (typeof el === "object" && el !== null && !!el["src"]) {
    return resources[el["src"]].value;
  }

  // crawl children if el is array or object
  if (Array.isArray(el)) {
    return el.map((c) => resolveResources(c, resources));
  } else if (typeof el === "object" && el !== null) {
    return Object.fromEntries(
      Object.entries(el).map(([key, value]) => [
        key,
        resolveResources(value, resources),
      ]),
    );
  } else {
    return el;
  }
}

function dependenciesLoaded(currentContent, resources) {
  return currentContent.dependencies.every(
    (d) => !!resources[d] && resources[d].loadingStatus === SUCCESS,
  );
}
