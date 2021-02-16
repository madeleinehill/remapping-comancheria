import * as PIXI from "pixi.js";

export const shapeDefaults = {
  fill: 0x3388ff,
  fillOpacity: 0.5,
  strokeWeight: undefined,
  stroke: 0x3388ff,
  strokeOpacity: 1,
  blurIntensity: 0,
};

export const drawPolygon = ({ shape, project, scale }) => {
  const { positions, instance } = shape;

  const {
    fill,
    fillOpacity,
    strokeWeight,
    stroke,
    strokeOpacity,
    blurIntensity,
  } = {
    ...shapeDefaults,
    ...shape.properties,
  };
  console.log(shape);

  instance.clear();
  if (strokeWeight !== undefined) {
    instance.lineStyle(strokeWeight / scale, stroke, strokeOpacity);
  }

  positions.forEach((f) => {
    console.log(f);
    const projectedPolygon = f.map((coords, index) => {
      return project(coords);
    });

    instance.beginFill(fill, fillOpacity);
    projectedPolygon.forEach(function (coord, index) {
      if (index === 0) instance.moveTo(coord.x, coord.y);
      else instance.lineTo(coord.x, coord.y);
    });
    instance.endFill();
  });

  const blurfilter = new PIXI.filters.BlurFilter();
  instance.filters = [blurfilter];
  blurfilter.blur = blurIntensity * scale;
};

export const drawOverlay = ({ shapes, utils }) => {
  console.log("drawing", shapes);
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
  });

  renderer.render(container);
};
