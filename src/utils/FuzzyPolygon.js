import { useEffect, useRef } from "react";
import { useLeafletContext } from "@react-leaflet/core";
import "leaflet/dist/leaflet.css";

import * as PIXI from "pixi.js";
import "leaflet-pixi-overlay"; // Must be called before the 'leaflet' import
import L from "leaflet";

import { drawOverlay } from "./fuzzyUtils";

function FuzzyPolygon(props) {
  const context = useLeafletContext();
  const elementRef = useRef();
  const pixiContainer = new PIXI.Container();

  useEffect(() => {
    const container = context.layerContainer || context.map;

    const shape = new PIXI.Graphics();
    pixiContainer.addChild(shape);

    const polygon = {
      positions: props.positions,
      instance: shape,
      properties: props.properties,
    };

    elementRef.current = new L.pixiOverlay(
      (utils) => drawOverlay({ shapes: [polygon], utils }),
      pixiContainer,
    );
    container.addLayer(elementRef.current);

    return () => {
      container.removeLayer(elementRef.current);
    };
  }, [props.position, props.properties]);

  return null;
}

export default FuzzyPolygon;
