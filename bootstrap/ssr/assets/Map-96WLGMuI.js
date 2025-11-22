import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { MapContainer, LayersControl, TileLayer, Marker, Popup, useMap, Polyline } from "react-leaflet";
import { c as categoryColors } from "./constants-BHE6LNk3.js";
import { t as toIDR } from "./helper-DadYwhGw.js";
import { forwardRef, useRef, useState, useImperativeHandle, useEffect } from "react";
import L from "leaflet";
function MapPopup({ location }) {
  return /* @__PURE__ */ jsxs("div", { className: "font-poppins", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      "p",
      {
        className: `text-sm text-white font-semibold px-5 py-2.5 rounded-full w-fit ${categoryColors[location.category.id]}`,
        children: location.category.name
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "px-2.5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end mt-5 text-lg font-semibold", children: [
        /* @__PURE__ */ jsx("p", { className: "!m-0", children: location.title }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-right font-medium text-gray-500 !m-0", children: "Start from" }),
          /* @__PURE__ */ jsx("p", { className: "text-primary-opaque text-right !m-0", children: toIDR(location.start_from) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-400 flex items-center gap-2 font-semibold", children: [
        /* @__PURE__ */ jsx("i", { className: "bi bi-clock-fill" }),
        /* @__PURE__ */ jsx("p", { className: "!m-0", children: location.officehours })
      ] }),
      /* @__PURE__ */ jsx("hr", { className: "my-4 border-gray-300" }),
      /* @__PURE__ */ jsx(
        "p",
        {
          className: "text-wrap line-clamp-2 text-sm text-gray-400 font-medium map-popup",
          dangerouslySetInnerHTML: { __html: location.description }
        }
      )
    ] })
  ] });
}
const Recenter = ({ lat, lng, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], zoom);
  }, [lat, lng, zoom]);
  return null;
};
const NavigationRoute = ({ userLocation, destination }) => {
  const map = useMap();
  const [routePoints, setRoutePoints] = useState([]);
  const [directions, setDirections] = useState([]);
  const [routeLoading, setRouteLoading] = useState(false);
  const [routeError, setRouteError] = useState(null);
  const [showDirections, setShowDirections] = useState(true);
  const directionsRef = useRef(null);
  useEffect(() => {
    setRoutePoints([]);
    setDirections([]);
    setRouteError(null);
  }, [destination]);
  useEffect(() => {
    if (directionsRef.current) {
      L.DomEvent.disableScrollPropagation(directionsRef.current);
    }
  }, [directionsRef, showDirections]);
  useEffect(() => {
    if (!userLocation) return;
    const fetchRoute = async () => {
      var _a;
      setRouteLoading(true);
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${userLocation.lng},${userLocation.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson&steps=true`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.code === "Ok" && ((_a = data.routes) == null ? void 0 : _a.length) > 0) {
          const route = data.routes[0];
          setRoutePoints(
            route.geometry.coordinates.map((coord) => [
              coord[1],
              coord[0]
            ])
          );
          const stepList = route.legs[0].steps.map((step, index) => ({
            distance: step.distance,
            duration: step.duration,
            instruction: step.maneuver.instruction || step.maneuver.type,
            name: step.name,
            index
          }));
          setDirections(stepList);
          const bounds = L.latLngBounds([
            [userLocation.lat, userLocation.lng],
            [destination.lat, destination.lng]
          ]);
          map.fitBounds(bounds, { padding: [50, 50] });
        } else {
          setRouteError("Could not calculate route");
        }
      } catch (error) {
        setRouteError(`Error calculating route: ${error.message}`);
      } finally {
        setRouteLoading(false);
      }
    };
    fetchRoute();
  }, [userLocation, destination, map]);
  if (routeLoading)
    return /* @__PURE__ */ jsx("div", { className: "route-loading", children: "Calculating route..." });
  if (routeError) return /* @__PURE__ */ jsx("div", { className: "route-error", children: routeError });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    routePoints.length > 0 && /* @__PURE__ */ jsx(
      Polyline,
      {
        positions: routePoints,
        pathOptions: { color: "blue", weight: 5, opacity: 0.7 }
      }
    ),
    directions.length > 0 && /* @__PURE__ */ jsxs(
      "div",
      {
        ref: directionsRef,
        className: "absolute bottom-0 left-0 z-[1000] bg-white bg-opacity-90 rounded-md m-4 shadow-md w-[300px] text-sm",
        children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setShowDirections(!showDirections),
              className: "w-full bg-blue-100 flex justify-between text-blue-800 hover:cursor-pointer px-3 py-2 font-semibold text-left rounded-t-md",
              children: showDirections ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("span", { children: "Hide directions " }),
                /* @__PURE__ */ jsx("i", { className: "bi bi-chevron-down" })
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("span", { children: "Show directions " }),
                /* @__PURE__ */ jsx("i", { className: "bi bi-chevron-up" })
              ] })
            }
          ),
          showDirections && /* @__PURE__ */ jsxs("div", { className: "max-h-[40vh] overflow-auto p-3", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold mb-2", children: "Directions" }),
            /* @__PURE__ */ jsx("ol", { className: "list-decimal pl-5 space-y-2", children: directions.map((step) => /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: step.instruction }),
              step.name && ` onto ${step.name}`,
              /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500", children: [
                (step.distance / 1e3).toFixed(2),
                " ",
                "km, ~",
                Math.round(step.duration / 60),
                " min"
              ] })
            ] }, step.index)) })
          ] })
        ]
      }
    )
  ] });
};
const Map = forwardRef(function Map2({ lat, long, location, onMarkerDragEnd, customMarker, isNavigation = true }, ref) {
  const zoom = 16;
  const destination = { lat, lng: long };
  const markerRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [navigationStarted, setNavigationStarted] = useState(false);
  const handleDragEnd = () => {
    const marker = markerRef.current;
    if (marker != null) {
      const { lat: lat2, lng } = marker.getLatLng();
      if (onMarkerDragEnd) {
        onMarkerDragEnd({ lat: lat2, lng });
      }
    }
  };
  const startNavigation = () => {
    setLocationError(null);
    setLocationLoading(true);
    setNavigationStarted(true);
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setLocationLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocationLoading(false);
        setLocationError(null);
      },
      (error) => {
        setLocationError(`Error getting location: ${error.message}`);
        setLocationLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };
  useImperativeHandle(ref, () => ({
    startNavigation
  }));
  useEffect(() => {
    if (navigationStarted) {
      startNavigation();
    }
  }, [lat, long, location]);
  const centerPosition = navigationStarted && userLocation ? [userLocation.lat, userLocation.lng] : [lat, long];
  const initialZoom = navigationStarted && userLocation ? 12 : zoom;
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    locationLoading && /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 z-[1000] bg-white bg-opacity-90 p-4 rounded-md m-4 shadow-md", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxs(
        "svg",
        {
          className: "animate-spin h-5 w-5 mr-3 text-blue-500",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          children: [
            /* @__PURE__ */ jsx(
              "circle",
              {
                className: "opacity-25",
                cx: "12",
                cy: "12",
                r: "10",
                stroke: "currentColor",
                strokeWidth: "4"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                className: "opacity-75",
                fill: "currentColor",
                d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              }
            )
          ]
        }
      ),
      "Getting your location..."
    ] }) }),
    locationError && /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 z-[1000] bg-white bg-opacity-90 p-4 rounded-md m-4 shadow-md text-red-500 flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            className: "h-5 w-5 mr-2",
            viewBox: "0 0 20 20",
            fill: "currentColor",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                fillRule: "evenodd",
                d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
                clipRule: "evenodd"
              }
            )
          }
        ),
        locationError
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setLocationError(null),
          className: "text-sm font-bold px-2 py-1 rounded hover:bg-gray-100",
          children: "×"
        }
      )
    ] }),
    isNavigation && navigationStarted && userLocation && /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 right-0 z-[1000] bg-opacity-90 rounded-md m-4 shadow-md", children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => {
          var _a;
          const map = (_a = markerRef.current) == null ? void 0 : _a._map;
          if (map && userLocation) {
            map.flyTo(
              [userLocation.lat, userLocation.lng],
              16
            );
          }
        },
        className: "bg-white hover:bg-gray-100 hover:cursor-pointer text-gray-500 w-12 h-12 grid place-content-center rounded-md",
        children: /* @__PURE__ */ jsx("i", { className: "bi bi-crosshair text-2xl" })
      }
    ) }),
    /* @__PURE__ */ jsxs(
      MapContainer,
      {
        center: centerPosition,
        zoom: initialZoom,
        scrollWheelZoom: true,
        children: [
          /* @__PURE__ */ jsx(
            Recenter,
            {
              lat: centerPosition[0],
              lng: centerPosition[1],
              zoom: initialZoom
            }
          ),
          /* @__PURE__ */ jsxs(LayersControl, { position: "topright", children: [
            /* @__PURE__ */ jsx(LayersControl.BaseLayer, { checked: true, name: "OpenStreetMap", children: /* @__PURE__ */ jsx(
              TileLayer,
              {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              }
            ) }),
            /* @__PURE__ */ jsx(LayersControl.BaseLayer, { name: "Satellite", children: /* @__PURE__ */ jsx(
              TileLayer,
              {
                attribution: "Tiles © Esri",
                url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx(
            Marker,
            {
              position: [lat, long],
              draggable: !!onMarkerDragEnd,
              eventHandlers: { dragend: handleDragEnd },
              ref: markerRef,
              children: /* @__PURE__ */ jsx(Popup, { minWidth: 400, maxWidth: 400, children: customMarker || /* @__PURE__ */ jsx(MapPopup, { location }) })
            }
          ),
          navigationStarted && userLocation && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              Marker,
              {
                position: [userLocation.lat, userLocation.lng],
                icon: L.divIcon({
                  className: "current-location-marker",
                  html: '<div class="pulse"></div>',
                  iconSize: [20, 20],
                  iconAnchor: [10, 10]
                }),
                children: /* @__PURE__ */ jsx(Popup, { children: "Your current location" })
              }
            ),
            /* @__PURE__ */ jsx(
              NavigationRoute,
              {
                userLocation,
                destination
              },
              `${destination.lat}-${destination.lng}`
            )
          ] })
        ]
      }
    )
  ] });
});
export {
  Map as M
};
