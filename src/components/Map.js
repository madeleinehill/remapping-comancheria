import React from "react";
import { Map, TileLayer, Popup, Marker, Polygon } from "react-leaflet";
import { connect } from "react-redux";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { SUCCESS, config } from "../utils/constants";

import { createUseStyles } from "react-jss";
import ReactMarkdown from "react-markdown";

const useStyles = createUseStyles((theme) => ({
  map: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
}));

const customMarker = new L.Icon({
  iconUrl: `${config.API_URL}/marker-icon-2x.png`,
  iconRetinaUrl: null,
  iconAnchor: new L.Point(15, 50),
  popupAnchor: new L.Point(0, -50),
  shadowUrl: `${config.API_URL}/marker-shadow.png`,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(30, 50),
});

const MapWrapper = (props) => {
  const classes = useStyles(props);
  const { currentLesson } = props;

  const currentContent =
    currentLesson.loadingStatus === SUCCESS &&
    currentLesson.content.loadingStatus === SUCCESS
      ? currentLesson.content[currentLesson.currentIndex]
      : {};

  const popups = !!currentContent.popups ? currentContent.popups : [];
  const shapes = !!currentContent.shapes ? currentContent.shapes : [];

  const polygons = shapes.filter((s) => s.type === "polygon");

  return (
    <>
      <Map
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
        {polygons.map((p, i) => (
          <Polygon
            key={i}
            positions={p.positions}
            color={p.color ? p.color : "red"}
          ></Polygon>
        ))}
        {popups.map((p, i) => (
          <Marker position={p.position} icon={customMarker}>
            <Popup key={i} color={p.color ? p.color : "red"}>
              <ReactMarkdown>{p.text}</ReactMarkdown>
            </Popup>
          </Marker>
        ))}
      </Map>
    </>
  );
};

const mapStateToProps = (state) => ({ currentLesson: state.currentLesson });

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MapWrapper);
