import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useRef } from "react";
import { MAPBOX_SECRET } from "../../../../config/MapBoxSecret";
import { useParams } from "react-router-dom";

const MapBox = ({ Coordinate_X, Coordinate_Y, Bengkel_name }) => {
  const { Bengkel_Id } = useParams();
  const mapContainerRef = useRef(null);
  const customCoordinates = [Coordinate_X, Coordinate_Y]; // Jakarta, Indonesia
  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_SECRET;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: customCoordinates, // initial center of the map
      zoom: 15,
    });

    // Example custom coordinates (longitude, latitude)

    // Add marker
    const popup = new mapboxgl.Popup({ offset: 25 }).setText(Bengkel_name);

    // Add marker with popup
    new mapboxgl.Marker()
      .setLngLat(customCoordinates)
      .setPopup(popup)
      .addTo(map)
      .togglePopup();

    return () => map.remove(); // cleanup
  }, []);

  return (
    <div className="mt-5 w-full h-[400px] rounded-lg overflow-hidden mb-5">
      <div ref={mapContainerRef} id="map" className="w-full h-full mb-1" />
    </div>
  );
};

export default MapBox;
