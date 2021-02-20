import { useEffect, useRef } from "react";
import { useLeafletContext } from "@react-leaflet/core";
import "leaflet/dist/leaflet.css";

import * as PIXI from "pixi.js";
import "leaflet-pixi-overlay"; // Must be called before the 'leaflet' import
import L from "leaflet";

import { drawOverlay, parseGeojson } from "./fuzzyUtils";

function FuzzyLayer(props) {
  const context = useLeafletContext();
  const elementRef = useRef();
  const pixiContainer = new PIXI.Container();

  useEffect(() => {
    const shapeData = !!props.data ? parseGeojson(props.data) : [];

    console.log(shapeData);

    const container = context.layerContainer || context.map;
    const shapes = [];
    for (let i = 0; i < shapeData.length; i++) {
      const shape = new PIXI.Graphics();
      pixiContainer.addChild(shape);
      shapes.push({
        positions: shapeData[i].positions,
        instance: shape,
        properties: shapeData[i].properties,
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
