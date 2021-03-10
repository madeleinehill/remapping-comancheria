import React from "react";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  // Polygon,
  useMap,
  ImageOverlay,
} from "react-leaflet";
import { connect } from "react-redux";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import FuzzyLayer from "../utils/FuzzyLayer";
import FuzzyPolygon from "../utils/FuzzyPolygon";
import * as turf from "@turf/turf";

import { getMapElements } from "../modules/selectors";

import { createUseStyles } from "react-jss";
// import ReactMarkdown from "react-markdown";
import MdParser from "../utils/MdParser";

const useStyles = createUseStyles((theme) => ({
  map: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
}));

const customMarker = new L.Icon({
  iconUrl: `${process.env.PUBLIC_URL}/marker-icon-2x.png`,
  iconRetinaUrl: null,
  iconAnchor: new L.Point(15, 50),
  popupAnchor: new L.Point(0, -50),
  shadowUrl: `${process.env.PUBLIC_URL}/marker-shadow.png`,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(30, 50),
});

function ZoomTo({ value, geojson }) {
  const map = useMap();
  const { center, zoomLevel, bbox } = value;

  // if center specified, zoom to it
  if (Array.isArray(center) && center.length === 2) {
    map.flyTo(center, zoomLevel);
    return null;
  }

  // else if bbox specified, zoom to it
  if (Array.isArray(bbox) && bbox.length === 2) {
    map.flyToBounds([
      [bbox[1], bbox[0]],
      [bbox[3], bbox[2]],
    ]);
    return null;
  }

  if (!geojson.length || !geojson[0].features || !geojson[0].features.length) {
    return null;
  }
  // else zoom to bounds of first geojson entity
  const bounds =
    geojson.length > 0 && geojson[0] ? turf.bbox(geojson[0]) : undefined;

  if (!!bounds) {
    map.flyToBounds([
      [bounds[1], bounds[0]],
      [bounds[3], bounds[2]],
    ]);
  }
  return null;
}

const MapWrapper = (props) => {
  const classes = useStyles(props);
  const { popups, overlays, polygons, geojson, zoomTo } = props;

  const o = overlays.length
    ? { opacity: 0.5, ...overlays[0] }
    : {
        attributionUrl: "https://mapwarper.net/maps/52913/",
        attributionText: "MapWarper",
        tilesUrl: "https://mapwarper.net/maps/tile/52913/{z}/{x}/{y}.png",
        opacity: 0,
      };

  return (
    <>
      <MapContainer
        className={classes.map}
        center={[35, -105]}
        zoom={5}
        zoomControl={false}
        minZoom={5}
        maxZoom={7}
      >
        {props.children}
        <ZoomTo value={zoomTo} geojson={geojson} />
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &mdash; Source: US National Park Service"
        />
        {
          // <ImageOverlay
          //   url={`${process.env.PUBLIC_URL}/overlay.png`}
          //   bounds={[new L.latLng(60, -135), new L.latLng(-18, -30)]}
          //   opacity={0.5}
          // />
        }
        {
          <TileLayer
            attribution={
              o.attributionText
                ? `&copy; <a href="${o.attributionUrl}">${o.attributionText}</a> contributors`
                : ""
            }
            url={o.tilesUrl}
            opacity={o.opacity}
            key={o.tilesUrl}
          />
        }
        {/* {polygons.map((p, i) => (
          <FuzzyPolygon
            key={i}
            positions={p.positions}
            color={p.color ? p.color : "red"}
          ></FuzzyPolygon>
        ))} */}
        {geojson.map(
          (f, i) => f && <FuzzyLayer data={f} key={`gj${i}`}></FuzzyLayer>,
        )}
        {popups.map((p, i) => (
          <Marker position={p.position} icon={customMarker}>
            <Popup key={i} color={p.color ? p.color : "red"}>
              <MdParser>{p.text}</MdParser>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

const mapStateToProps = (state) => {
  return getMapElements(state);
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MapWrapper);
