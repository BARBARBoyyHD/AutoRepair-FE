import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import { useEffect, useRef } from "react";
import { MAPBOX_SECRET } from "../../../../config/MapBoxSecret";

const MapBoxList = ({ bengkelList, userLocation }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const directionsRef = useRef(null);

  useEffect(() => {
    if (!userLocation || !bengkelList || bengkelList.length === 0) return;
    console.log(userLocation);

    mapboxgl.accessToken = MAPBOX_SECRET;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: userLocation,
      zoom: 12,
    });

    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/driving",
      controls: {
        instructions: false, // ✅ hides the big black panel
      },
    });

    directionsRef.current = directions;
    map.addControl(directions, "top-left");

    // Add user marker if location is available
    if (userLocation) {
      new mapboxgl.Marker({ color: "blue" })
        .setLngLat(userLocation)
        .setPopup(new mapboxgl.Popup().setText("Your Location"))
        .addTo(map);
    }

    // Add all bengkels
    bengkelList.forEach((bengkel) => {
      const popupNode = document.createElement("div");
      popupNode.innerHTML = `
        <h3>${bengkel.Bengkel_name}</h3>
        <p>${bengkel.Address}</p>
        <button id="btn-${bengkel.Bengkel_Id}">Show Route</button>
      `;

      const popup = new mapboxgl.Popup().setDOMContent(popupNode);

      popup.on("open", () => {
        const button = document.getElementById(`btn-${bengkel.Bengkel_Id}`);
        if (button && userLocation) {
          button.addEventListener("click", () => {
            directions.setOrigin(userLocation);
            directions.setDestination([
              bengkel.Coordinate_X,
              bengkel.Coordinate_Y,
            ]);
          });
        }
      });

      new mapboxgl.Marker({ color: "red" })
        .setLngLat([bengkel.Coordinate_X, bengkel.Coordinate_Y])
        .setPopup(popup)
        .addTo(map);
    });

    return () => map.remove();
  }, [bengkelList, userLocation]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
};

export default MapBoxList;
