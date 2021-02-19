import React from "react";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  // Polygon,
  ImageOverlay,
} from "react-leaflet";
import { connect } from "react-redux";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import FuzzyLayer from "../utils/FuzzyLayer";
import FuzzyPolygon from "../utils/FuzzyPolygon";

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

const MapWrapper = (props) => {
  const classes = useStyles(props);
  const { popups, overlays, polygons, geojson } = props;

  return (
    <>
      <MapContainer
        className={classes.map}
        center={[35, -100]}
        zoom={5}
        zoomControl={false}
      >
        {props.children}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &mdash; Source: US National Park Service"
          minZoom={2}
          maxZoom={10}
        />
        {
          // <ImageOverlay
          //   url={`${process.env.PUBLIC_URL}/overlay.png`}
          //   bounds={[new L.latLng(60, -135), new L.latLng(-18, -30)]}
          //   opacity={0.5}
          // />
        }
        {overlays &&
          overlays.map((o) => (
            <TileLayer
              attribution={`&copy; <a href="${o.attributionUrl}">${o.attributionText}</a> contributors`}
              url={o.tilesUrl}
              opacity="0.5"
            />
          ))}
        {polygons.map((p, i) => (
          <FuzzyPolygon
            key={i}
            positions={p.positions}
            color={p.color ? p.color : "red"}
          ></FuzzyPolygon>
        ))}
        {<FuzzyLayer data={geojson}></FuzzyLayer>}
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
  const { popups, overlays, polygons, geojson } = getMapElements(state);
  return { popups, overlays, polygons, geojson };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MapWrapper);
