import React from "react";
import {
  Map,
  TileLayer,
  Popup,
  Circle,
  ZoomControl,
  Polygon,
} from "react-leaflet";
import { connect } from "react-redux";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import CustomPopup from "./CustomPopup";

import { createUseStyles } from "react-jss";

// necessary to allow for correct loading of marker icon
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const useStyles = createUseStyles((theme) => ({
  map: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
}));

const MapWrapper = (props) => {
  console.log(props.totalMentions);
  const classes = useStyles(props);

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
        <Polygon
          positions={[
            [37, -109.05],
            [43, -109.03],
            [41, -102.05],
            [37, -102.04],
          ]}
          color={"red"}
        ></Polygon>
        {/* {Object.keys(props.mentions).map((obs, i) => {
          return (
            <Circle>
              <Popup>
                <CustomPopup
                  data={{
                    mentions: props.mentions[obs].count,
                    literals: props.mentions[obs].literals,
                    totalMentions: props.totalMentions,
                  }}
                />
              </Popup>
            </Circle>
          );
        })} */}
      </Map>
    </>
  );
};

const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MapWrapper);
