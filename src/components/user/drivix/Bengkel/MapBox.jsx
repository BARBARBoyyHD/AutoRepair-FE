import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import { MAPBOX_SECRET } from "../../../../config/MapBoxSecret";

mapboxgl.accessToken = MAPBOX_SECRET;

const MapBox = ({ allBengkels }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const directionsRef = useRef(null);
  const userLocationRef = useRef(null);

  useEffect(() => {
    if (
      !allBengkels ||
      !allBengkels.Coordinate_X ||
      !allBengkels.Coordinate_Y
    ) {
      console.warn("Bengkel data missing or invalid.");
      return;
    }

    const userFallbackCoords = [107.6191, -6.9175];

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userCoords = [pos.coords.longitude, pos.coords.latitude];
        userLocationRef.current = userCoords;
        initMap(userCoords);
      },
      () => {
        userLocationRef.current = userFallbackCoords;
        initMap(userFallbackCoords);
      }
    );

    const initMap = (userCoords) => {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: userCoords,
        zoom: 13,
      });

      mapRef.current = map;

      // Add controls
      map.addControl(new mapboxgl.NavigationControl(), "top-right");

      // Add user marker
      new mapboxgl.Marker({ color: "blue" })
        .setLngLat(userCoords)
        .setPopup(new mapboxgl.Popup().setHTML("<b>Your Location</b>"))
        .addTo(map);

      // Directions control
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

      // Add Bengkel marker
      const marker = new mapboxgl.Marker({ color: "red" })
        .setLngLat([allBengkels.Coordinate_X, allBengkels.Coordinate_Y])
        .setPopup(
          new mapboxgl.Popup().setDOMContent(
            createPopupContent(allBengkels, () => {
              directions.setOrigin(userCoords);
              directions.setDestination([
                allBengkels.Coordinate_X,
                allBengkels.Coordinate_Y,
              ]);
            })
          )
        )
        .addTo(map);
    };

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [allBengkels]);

  // Popup content as DOM element (safe & interactive)
  const createPopupContent = (bengkel, onDirectionClick) => {
    const container = document.createElement("div");

    const name = document.createElement("h3");
    name.textContent = bengkel.Bengkel_name;
    container.appendChild(name);

    const address = document.createElement("p");
    address.textContent = bengkel.Address;
    container.appendChild(address);

    const button = document.createElement("button");
    button.innerText = "Show Route";
    button.style.marginTop = "5px";
    button.style.color = "#1d4ed8";
    button.style.textDecoration = "underline";
    button.style.cursor = "pointer";
    button.onclick = onDirectionClick;

    container.appendChild(button);
    return container;
  };

  return (
    <div
      ref={mapContainerRef}
      style={{ width: "100%", height: "600px", borderRadius: "8px" }}
    />
  );
};

export default MapBox;
