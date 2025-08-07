import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import { useEffect, useRef } from "react";
import { MAPBOX_SECRET } from "../../../../config/MapBoxSecret";

const MapBox = ({ allBengkels }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const directionsRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_SECRET;

    // Create map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [107.6191, -6.9175], // Default center
      zoom: 12,
    });

    mapRef.current = map;

    // Add controls
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Get user's current position
    navigator.geolocation.getCurrentPosition((position) => {
      const userCoords = [position.coords.longitude, position.coords.latitude];

      // Add user location marker
      new mapboxgl.Marker({ color: "blue" })
        .setLngLat(userCoords)
        .setPopup(new mapboxgl.Popup().setHTML("<b>Your Location</b>"))
        .addTo(map);

      // Initialize directions
      const directions = new MapboxDirections({
        accessToken: MAPBOX_SECRET,
        unit: "metric",
        profile: "mapbox/driving",
        interactive: false,
      });

      directionsRef.current = directions;
      map.addControl(directions, "top-left");

      // Add all bengkel markers
      allBengkels.forEach((bengkel) => {
        const marker = new mapboxgl.Marker({ color: "red" })
          .setLngLat([bengkel.Coordinate_X, bengkel.Coordinate_Y])
          .setPopup(
            new mapboxgl.Popup().setHTML(
              `<div>
                 <h3>${bengkel.Bengkel_name}</h3>
                 <p>${bengkel.Address}</p>
                 <button onclick="window.setDirection([${bengkel.Coordinate_X}, ${bengkel.Coordinate_Y}])">
                   Show Route
                 </button>
               </div>`
            )
          )
          .addTo(map);
      });

      // Make a global method to be called from popup button
      window.setDirection = (destinationCoords) => {
        directions.setOrigin(userCoords);
        directions.setDestination(destinationCoords);
      };
    });

    return () => map.remove();
  }, [allBengkels]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
};

export default MapBox;
