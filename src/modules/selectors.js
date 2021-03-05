import { createSelector } from "reselect";
import { SUCCESS } from "../utils/constants";

const getCurrentLesson = (state) => state.currentLesson;
const getResources = (state) => state.resources;

export const getModalContent = createSelector(
  [getCurrentLesson, getResources],
  (currentLesson, resources) => {
    const { currentIndex, content } = currentLesson;

    if (!content[currentIndex] || !content[currentIndex].modal) {
      return {};
    }

    return resolveResources(content[currentIndex].modal, resources);
  },
);

export const getCardContent = createSelector(
  [getCurrentLesson, getResources],
  (currentLesson, resources) => {
    const { currentIndex, content } = currentLesson;

    if (!content[currentIndex] || !content[currentIndex].card) {
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
    const emptyProps = { popups: [], geojson: [], overlays: [] };

    if (loadingStatus !== SUCCESS) {
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
    };
  },
);

function resolveResources(el, resources) {
  // if el is an object, check if there is an src attribute to resolve
  if (typeof el === "object" && el !== null && !!el["src"]) {
    // if resource has been loaded
    if (!!resources[el["src"]]) {
      return resources[el["src"]].value;
    } else {
      return undefined;
    }
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
