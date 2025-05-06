import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useRef, useState } from "react";
import { MAPBOX_SECRET } from "../../../../config/MapBoxSecret";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../loading/LoadingSpinner";

const MapBox = ({ Coordinate_X, Coordinate_Y, Bengkel_name }) => {
  const { Bengkel_Id } = useParams();
  const mapContainerRef = useRef(null);
  const [loading, setLoading] = useState(true); // loading state

  const customCoordinates = [Coordinate_X, Coordinate_Y];

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_SECRET;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: customCoordinates,
      zoom: 15,
    });

    // When map finishes loading
    map.on("load", () => {
      setLoading(false); // hide spinner
    });

    const popup = new mapboxgl.Popup({ offset: 25 }).setText(Bengkel_name);

    new mapboxgl.Marker()
      .setLngLat(customCoordinates)
      .setPopup(popup)
      .addTo(map)
      .togglePopup();

    return () => map.remove();
  }, []);

  return (
    <div className="mt-5 w-full h-[400px] rounded-lg overflow-hidden relative">
      {loading && (
        <div className="absolute inset-0 z-10 bg-black bg-opacity-70 flex justify-center items-center">
          <LoadingSpinner />
        </div>
      )}
      <div ref={mapContainerRef} id="map" className="w-full h-full" />
    </div>
  );
};

export default MapBox;
