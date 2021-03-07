import * as PIXI from "pixi.js";
import * as turf from "@turf/turf";

export const shapeDefaults = {
  color: "0x3388ff",
  fillOpacity: 0.5,
  strokeWeight: undefined,
  stroke: "0x3388ff",
  strokeOpacity: 1,
  blurIntensity: 0,
  interact: false,
};

const drawPolygon = ({ shape, project, scale }) => {
  const { positions, instance } = shape;

  if (!positions || !positions.length) {
    return;
  }

  const {
    color,
    fillOpacity,
    strokeWeight,
    stroke,
    strokeOpacity,
    blurIntensity,
    interact,
    labelField,
  } = {
    ...shapeDefaults,
    ...shape.properties,
  };

  instance.clear();
  if (strokeWeight !== undefined) {
    instance.lineStyle(strokeWeight / scale, stroke, strokeOpacity);
  }
  const projectedPolygon = positions.map((coords, index) => project(coords));

  const hexcode =
    color.length > 1 && color.substring(0, 1) === "#"
      ? `0x${color.substring(1)}`
      : color;

  instance.beginFill(hexcode, fillOpacity);
  projectedPolygon.forEach(function (coord, index) {
    if (index === 0) instance.moveTo(coord.x, coord.y);
    else instance.lineTo(coord.x, coord.y);
  });
  instance.endFill();

  // if (!!interact) {
  //   console.log("adding interactivity");
  //   instance.interactive = true;
  //   instance.hitArea = new PIXI.Polygon([
  //     projectedPolygon.map((coord) => new PIXI.Point([coord.x, coord.y])),
  //   ]);
  //   instance.on("mouseover", function (mouseData) {
  //     console.log("MOUSE OVER SHAPE");
  //   });
  // }

  const blurfilter = new PIXI.filters.BlurFilter();
  instance.filters = [blurfilter];
  blurfilter.blur = blurIntensity * scale;
};

const drawLabel = ({ shape, project, scale }) => {
  const { positions, labelInstance } = shape;

  const { properties } = shape;
  console.log("drawing");
  if (!properties[properties.labelField]) {
    return;
  }

  labelInstance.text = properties[properties.labelField];

  const parentShape = turf.polygon([positions.map((p) => [p.lat, p.lng])]);
  const parentBbox = turf.bbox(parentShape);
  const parentCentroid = turf.centroid(parentShape).geometry.coordinates;
  const parentWidth = Math.abs(parentBbox[3] - parentBbox[1]);

  labelInstance.style = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: parentWidth * 30,
    fontStyle: "italic",
    fontWeight: "bold",
    fill: "#ffffff",
    stroke: "#1d1d1d",
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: parentWidth * 300,
    lineJoin: "round",
  });

  labelInstance.anchor.set(0.5);

  const coords = project({ lat: parentCentroid[0], lng: parentCentroid[1] });
  labelInstance.x = coords.x;
  labelInstance.y = coords.y;
};

export const drawOverlay = ({ shapes, utils }) => {
  const map = utils.getMap();

  if (!map) {
    return;
  }

  const container = utils.getContainer();
  const renderer = utils.getRenderer();
  const project = utils.latLngToLayerPoint;
  const scale = utils.getScale();

  shapes.forEach((shape) => {
    drawPolygon({ shape, project, scale });

    if (shape.labelInstance) {
      drawLabel({ shape, project, scale });
    }
  });

  renderer.render(container);
};

// takes any geojson and returns all embedded polygons as array

export const parseGeojson = (geo, properties = {}) => {
  if (geo.type === "FeatureCollection") {
    return geo.features.map((f) => parseGeojson(f, geo.properties)).flat();
  }
  if (geo.type === "Feature") {
    return parseGeojson(geo.geometry, { ...properties, ...geo.properties });
  }
  // not tested
  if (geo.type === "GeometryCollection") {
    return geo.geometries
      .map((f) => parseGeojson(f, { ...properties, ...geo.properties }))
      .flat();
  }
  // not tested
  if (geo.type === "MultiPolygon") {
    geo.coordinates.map((f) =>
      parseGeojson(
        { type: "Polygon", coordinates: f },
        { ...properties, ...geo.properties },
      ).flat(),
    );
  }
  if (geo.type === "Polygon") {
    return [
      {
        positions: geo.coordinates[0].map((c) => ({ lat: c[1], lng: c[0] })),
        properties: { ...properties, ...geo.properties },
      },
    ];
  }
  return [];
};
