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

export const hexCodeFromString = (str) =>
  str.length > 1 && str.substring(0, 1) === "#" ? `0x${str.substring(1)}` : str;

const drawMultiPolygon = ({ shape, project, scale }) => {
  const { geometry, instance } = shape;
  const { polyPositions } = geometry;
  if (!polyPositions || !polyPositions.length) {
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
  } = {
    ...shapeDefaults,
    ...shape.geometry.properties,
  };

  instance.clear();
  if (strokeWeight !== undefined) {
    instance.lineStyle(
      strokeWeight / scale,
      hexCodeFromString(stroke),
      strokeOpacity,
    );
  }

  polyPositions.forEach((poly) =>
    poly.forEach((ring, index) => {
      // PIXI does not support interior holes within a graphic
      // interior holes will be ignored
      if (index > 0) {
        return;
      }

      const projectedRing = ring.map((coords) => project(coords));

      instance.beginFill(hexCodeFromString(color), fillOpacity);
      instance.drawPolygon(
        projectedRing.reduce(
          (acc, coord) => acc.concat([coord.x, coord.y]),
          [],
        ),
      );
    }),
  );

  const blurfilter = new PIXI.filters.BlurFilter();
  instance.filters = [blurfilter];
  blurfilter.blur = blurIntensity * scale;
};

const drawPolygon = ({ shape, project, scale }) => {
  const { geometry, instance } = shape;

  if (!geometry) {
    return;
  }

  const {
    color,
    fillOpacity,
    strokeWeight,
    stroke,
    strokeOpacity,
    blurIntensity,
  } = {
    ...shapeDefaults,
    ...shape.geometry.properties,
  };

  instance.clear();
  if (strokeWeight !== undefined) {
    instance.lineStyle(
      strokeWeight / scale,
      hexCodeFromString(stroke),
      strokeOpacity,
    );
  }

  geometry.positions.forEach((ring, index) => {
    const projectedRing = ring.map((coords) => project(coords));
    // PIXI does not support interior holes within a graphic
    // interior holes will be ignored
    if (index > 0) {
      return;
    }

    instance.beginFill(hexCodeFromString(color), fillOpacity);
    instance.drawPolygon(
      projectedRing.reduce((acc, coord) => acc.concat([coord.x, coord.y]), []),
    );
  });

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

const drawLineString = ({ shape, project, scale }) => {
  const { geometry, instance } = shape;

  if (!geometry || !geometry.positions || geometry.positions.length < 2) {
    return;
  }

  const { strokeWeight, stroke, strokeOpacity } = {
    ...shapeDefaults,
    strokeWeight: 3,
    ...shape.geometry.properties,
  };

  instance.clear();
  if (strokeWeight !== undefined) {
    instance.lineStyle(
      strokeWeight / scale,
      hexCodeFromString(stroke),
      strokeOpacity,
    );
  }

  const projectCoords = geometry.positions.map((c) => project(c));
  projectCoords.forEach((coord, i) => {
    if (i === 0) {
      instance.moveTo(projectCoords[i].x, projectCoords[i].y);
    } else {
      instance.lineTo(projectCoords[i].x, projectCoords[i].y);
    }
  });
};

const drawLabel = ({ shape, project, scale, size, centroid }) => {
  const { geometry, labelInstance } = shape;
  const { properties } = geometry;
  if (!properties["label"]) {
    return;
  }

  labelInstance.text = properties["label"];

  labelInstance.style = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: !!properties.labelScale ? properties.labelScale * size : size,
    fill: "#ffffff",
    stroke: "#1d1d1d",
    strokeThickness: 3,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: size * 10,
    lineJoin: "round",
  });

  labelInstance.anchor.set(0.5);

  const coords = project({ lat: centroid[0], lng: centroid[1] });
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
    if (shape.geometry.type === "MultiPolygon") {
      drawMultiPolygon({ shape, project, scale });
    } else if (shape.geometry.type === "Polygon") {
      drawPolygon({ shape, project, scale });
    } else if (shape.geometry.type === "LineString") {
      drawLineString({ shape, project, scale });
    }
    if (shape.labelInstance) {
      drawLabel({
        shape,
        project,
        scale,
        size: computeSize(shape.geometry),
        centroid: computeCentroid(shape.geometry),
      });
    }
  });

  renderer.render(container);
};

const computeCentroid = (geometry) => {
  if (geometry.type === "MultiPolygon") {
    const mp = turf.multiPolygon(
      geometry.polyPositions.map((poly) =>
        poly.map((ring) => ring.map((coord) => [coord.lat, coord.lng])),
      ),
    );
    return turf.centerOfMass(mp).geometry.coordinates;
  }

  if (geometry.type === "Polygon") {
    const mp = turf.polygon(
      geometry.positions.map((ring) =>
        ring.map((coord) => [coord.lat, coord.lng]),
      ),
    );
    return turf.centerOfMass(mp).geometry.coordinates;
  }
  return [0, 0];
};

const computeSize = (geometry) => {
  return 15;
};

// takes any geojson and returns all embedded polygons and
// multipolygons as array of polygons and multipolygons
export const parseGeojson = (geo, properties = {}) => {
  if (geo.type === "FeatureCollection") {
    return geo.features.map((f) => parseGeojson(f, geo.properties));
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
  if (geo.type === "MultiPolygon") {
    return {
      type: "MultiPolygon",
      properties: properties,
      polyPositions: geo.coordinates.map((poly) =>
        poly.map((ring) =>
          ring.map((c) => ({
            lat: c[1],
            lng: c[0],
          })),
        ),
      ),
    };
  }
  if (geo.type === "Polygon") {
    return {
      type: "Polygon",
      positions: geo.coordinates.map((ring) =>
        ring.map((c) => ({
          lat: c[1],
          lng: c[0],
        })),
      ),
      properties: { ...properties, ...geo.properties },
    };
  }
  if (geo.type === "LineString") {
    return {
      type: "LineString",
      positions: geo.coordinates.map((coord) => ({
        lat: coord[1],
        lng: coord[0],
      })),
      properties: { ...properties, ...geo.properties },
    };
  }
  return [];
};
