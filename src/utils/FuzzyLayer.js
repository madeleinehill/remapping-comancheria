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

  useEffect(() => {
    const shapeData = !!props.data ? parseGeojson(props.data) : [];
    const container = context.layerContainer || context.map;
    const shapes = [];

    const pixiContainer = new PIXI.Container();

    for (let i = 0; i < shapeData.length; i++) {
      const shape = new PIXI.Graphics();
      pixiContainer.addChild(shape);

      let label = undefined;
      // this conditional saves a lot of pain when labels are not enabled
      if (
        !!shapeData[i] &&
        !!shapeData[i].properties &&
        !!shapeData[i].properties.labelField
      ) {
        console.log(shapeData[i].properties.labelField);
        label = new PIXI.Text("", {});
        pixiContainer.addChild(label);
      }

      shapes.push({
        positions: shapeData[i].positions,
        instance: shape,
        properties: shapeData[i].properties,
        labelInstance: label,
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
  }, [props.data, context.layerContainer, context.map]);

  return null;
}

export default FuzzyLayer;
