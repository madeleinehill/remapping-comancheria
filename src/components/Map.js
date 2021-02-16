import React from "react";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  Polygon,
  ImageOverlay,
} from "react-leaflet";
import { connect } from "react-redux";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import FuzzyLayer from "../utils/FuzzyLayer";

import { SUCCESS, config } from "../utils/constants";

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
  const { currentLesson } = props;

  const currentContent =
    currentLesson.loadingStatus === SUCCESS &&
    currentLesson.content[currentLesson.currentIndex].loadingStatus === SUCCESS
      ? currentLesson.content[currentLesson.currentIndex]
      : {};

  const popups = !!currentContent.popups ? currentContent.popups : [];
  const shapes = !!currentContent.shapes ? currentContent.shapes : [];
  const features = !!currentContent.geodata ? currentContent.geodata : [];

  const polygons = shapes.filter((s) => s.type === "polygon");

  const data = features.map((feature) => {
    if (
      !feature.geometry ||
      !feature.geometry.type ||
      feature.geometry.type !== "Polygon"
    ) {
      return undefined;
    }
    return {
      positions: feature.geometry.coordinates.map((cgroup) =>
        cgroup.map((c) => ({ lat: c[1], lng: c[0] })),
      ),
      properties: feature.properties,
    };
  });

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
          <ImageOverlay
            url={`${process.env.PUBLIC_URL}/overlay.png`}
            bounds={[new L.latLng(60, -135), new L.latLng(-18, -30)]}
            opacity={0.5}
          />
        }
        {polygons.map((p, i) => (
          <Polygon
            key={i}
            positions={p.positions}
            color={p.color ? p.color : "red"}
          ></Polygon>
        ))}
        {<FuzzyLayer data={data}></FuzzyLayer>}
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

const mapStateToProps = (state) => ({ currentLesson: state.currentLesson });

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MapWrapper);
