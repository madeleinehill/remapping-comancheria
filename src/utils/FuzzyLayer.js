import { useEffect, useRef } from "react";
import { useLeafletContext } from "@react-leaflet/core";
import "leaflet/dist/leaflet.css";

import * as PIXI from "pixi.js";
import "leaflet-pixi-overlay"; // Must be called before the 'leaflet' import
import L from "leaflet";

import { drawOverlay } from "./fuzzyUtils";

function FuzzyLayer(props) {
  const context = useLeafletContext();
  const elementRef = useRef();
  const pixiContainer = new PIXI.Container();

  useEffect(() => {
    const container = context.layerContainer || context.map;
    const shapes = [];
    for (let i = 0; i < props.data.length; i++) {
      const shape = new PIXI.Graphics();
      pixiContainer.addChild(shape);
      shapes.push({
        positions: props.data[i].positions,
        instance: shape,
        properties: props.data[i].properties,
      });
    }
    elementRef.current = new L.pixiOverlay(
      (utils) => drawOverlay({ shapes, utils }),
      pixiContainer,
    );
    container.addLayer(elementRef.current);

    return () => {
      container.removeLayer(elementRef.current);
    };
  }, [props.data]);

  return null;
}

export default FuzzyLayer;
