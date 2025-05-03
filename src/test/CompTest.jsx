import React, { useEffect, useRef } from "react";
import SuccessTips from "../components/admin/alert/SuccessTips";
import { MAPBOX_SECRET } from "../config/MapBoxSecret";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const CompTest = () => {
  const mapContainerRef = useRef(null);
  const customCoordinates = [107.591504815345, -6.95899467836971]; // Jakarta, Indonesia
  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_SECRET;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: customCoordinates, // initial center of the map
      zoom: 9,
    });

    // Example custom coordinates (longitude, latitude)

    // Add marker
    const popup = new mapboxgl.Popup({ offset: 25 }).setText(
      "Teras Kopi 54 Cafe and Resto"
    );

    // Add marker with popup
    new mapboxgl.Marker()
      .setLngLat(customCoordinates)
      .setPopup(popup)
      .addTo(map)
      .togglePopup();

    return () => map.remove(); // cleanup
  }, []);

  return (
    <div>
      <h1>TEST</h1>
      <div
        ref={mapContainerRef}
        id="map"
        style={{ width: "100%", height: "400px", marginTop: "20px" }}
      />
    </div>
  );
};

export default CompTest;
