import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  LayersControl,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import MapPopup from "./MapPopup";

// Komponen untuk memusatkan ulang peta
const Recenter = ({ lat, lng, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (lat == null || lng == null) return;
    map.flyTo([lat, lng], zoom);
  }, [lat, lng, zoom, map]);

  return null;
};

// Warna untuk rute 
const colors = ["#2563EB", "#059669", "#F97316", "#7C3AED"];

// Komponen untuk menghitung dan menampilkan rute navigasi 
const NavigationRoute = ({ userLocation, destination, maxAlternatives = 3 }) => {
  const map = useMap();
  const [routes, setRoutes] = useState([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [routeLoading, setRouteLoading] = useState(false);
  const [routeError, setRouteError] = useState(null);
  const directionsRef = useRef(null);
  const [showDirections, setShowDirections] = useState(true);

  // Reset rute saat tujuan berubah
  useEffect(() => {
    setRoutes([]);
    setSelectedRouteIndex(0);
    setRouteError(null);
  }, [destination]);

    // Nonaktifkan propagasi scroll pada panel directions
  useEffect(() => {
    if (directionsRef.current) {
      L.DomEvent.disableScrollPropagation(directionsRef.current);
    }
  }, [directionsRef, showDirections]);

    // Hitung rute saat lokasi pengguna atau tujuan berubah
  useEffect(() => {
    if (!userLocation || !destination) return;

    // Fungsi untuk mengambil rute dari OSRM
    const fetchRoutes = async () => {
      setRouteLoading(true);
      setRouteError(null);

      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${userLocation.lng},${userLocation.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson&steps=true&alternatives=${maxAlternatives}`;

        const res = await fetch(url);
        const data = await res.json();
        
        console.log("OSRM Route Data:", data);

        // Proses data rute
        if (data.code === "Ok" && data.routes?.length > 0) {
          const mapped = data.routes.map((r, idx) => ({
            index: idx,
            distance: r.distance,
            duration: r.duration,
            geometry: r.geometry,
            legs: r.legs,
            latlngs: r.geometry.coordinates.map((c) => [c[1], c[0]]),
          }));

          setRoutes(mapped);

          // Sesuaikan batas peta untuk mencakup pengguna, tujuan, dan sampel titik rute
          const sampleCoords = mapped.flatMap((m) => m.latlngs.slice(0, 20));
          const allCoords = [
            [userLocation.lat, userLocation.lng],
            [destination.lat, destination.lng],
            ...sampleCoords,
          ];
          const bounds = L.latLngBounds(allCoords);
          map.fitBounds(bounds, { padding: [50, 50] });
        } else {
          setRouteError("Tidak dapat menghitung rute.");
        }
      } catch (err) {
        setRouteError(`Kesalahan perhitungan rute: ${err.message}`);
      } finally {
        setRouteLoading(false);
      }
    };

    fetchRoutes();
  }, [userLocation, destination, map, maxAlternatives]);

  if (routeLoading) return <div className="route-loading">Calculating routes...</div>;
  if (routeError) return <div className="route-error">{routeError}</div>;

  const selectedRoute = routes[selectedRouteIndex];

  return (
    <>
    {/* Gambar semua rute */}
      {routes.map((r, idx) => {
        const isSelected = idx === selectedRouteIndex;
        const color = colors[idx % colors.length];
        return (
          <Polyline
            key={`route-${idx}`}
            positions={r.latlngs}
            pathOptions={{
              color,
              weight: isSelected ? 6 : 4,
              opacity: isSelected ? 0.95 : 0.5,
              dashArray: isSelected ? null : "6,8",
            }}
            eventHandlers={{
              click: () => setSelectedRouteIndex(idx),
            }}
          />
        );
      })}

      {/* Panel ringkasan rute & directions */}
      {routes.length > 0 && (
        <div
          ref={directionsRef}
          className="absolute bottom-0 left-0 z-[1000] bg-white bg-opacity-95 rounded-md m-4 shadow-md w-[320px] text-sm"
        >
          <div className="px-3 py-2 flex justify-between items-center rounded-t-md bg-gray-50">
            <div className="font-semibold">Routes</div>
            <button
              onClick={() => setShowDirections(!showDirections)}
              className="text-xs text-gray-600 px-2 py-1 rounded hover:bg-gray-100"
            >
              {showDirections ? "Hide" : "Show"}
            </button>
          </div>

          {showDirections && (
            <div className="p-3 max-h-[45vh] overflow-auto">
              <div className="mb-3">
                {routes.map((r, idx) => (
                  <button
                    key={`summary-${idx}`}
                    onClick={() => {
                      setSelectedRouteIndex(idx);
                      const bounds = L.latLngBounds(r.latlngs);
                      map.fitBounds(bounds, { padding: [50, 50] });
                    }}
                    className={`w-full text-left p-2 rounded-md mb-2 border ${
                      idx === selectedRouteIndex
                        ? "border-blue-300 bg-blue-50"
                        : "border-transparent hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ background: colors[idx % colors.length] }}
                        />
                        <div className="text-sm font-medium">Route {idx + 1}</div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {(r.distance / 1000).toFixed(2)} km • {Math.round(r.duration / 60)} min
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* directions for selected route */}
              {selectedRoute && (
                <div>
                  <h3 className="font-semibold mb-2">Directions (Route {selectedRoute.index + 1})</h3>
                  <ol className="list-decimal pl-5 space-y-2 text-xs">
                    {selectedRoute.legs &&
                      selectedRoute.legs[0]?.steps?.map((step, sIdx) => (
                        <li key={`step-${sIdx}`}>
                          <div className="font-medium">
                            {step.maneuver.instruction || step.maneuver.type}
                            {step.name ? ` onto ${step.name}` : ""}
                          </div>
                          <div className="text-[11px] text-gray-500">
                            {(step.distance / 1000).toFixed(2)} km, ~{Math.round(step.duration / 60)} min
                          </div>
                        </li>
                      ))}

                    {selectedRoute.legs && selectedRoute.legs[0]?.steps?.length === 0 && (
                      <li>No step-by-step instructions available for this route.</li>
                    )}
                  </ol>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

// --- Main Map component ---
const Map = forwardRef(function Map(
  { lat, long, location, onMarkerDragEnd, customMarker, isNavigation = true, maxAlternatives = 3 },
  ref,
) {
  const zoom = 16;
  const destination = { lat, lng: long };
  const markerRef = useRef(null);

  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [navigationStarted, setNavigationStarted] = useState(false);

  // Tangani event drag end pada marker
  const handleDragEnd = () => {
    const marker = markerRef.current;
    if (marker != null) {
      const { lat, lng } = marker.getLatLng();
      if (onMarkerDragEnd) {
        onMarkerDragEnd({ lat, lng });
      }
    }
  };

    // Mulai navigasi dengan mendapatkan lokasi pengguna
  const startNavigation = () => {
    setLocationError(null);
    setLocationLoading(true);
    setNavigationStarted(true);

    if (!navigator.geolocation) {
      setLocationError("Browser Anda tidak mendukung Geolocation.");
      setLocationLoading(false);
      return;
    }

    // Dapatkan lokasi pengguna
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationLoading(false);
        setLocationError(null);
      },
      (error) => {
        setLocationError(`Error getting location: ${error.message}`);
        setLocationLoading(false);
      },
      { enableHighAccuracy: true },
    );
  };

  useImperativeHandle(ref, () => ({ startNavigation }));

  // Mulai navigasi ulang jika lat, long, atau location berubah
  useEffect(() => {
    if (navigationStarted) {
      startNavigation();
    }
  }, [lat, long, location]);

  // Tentukan posisi pusat peta dan zoom awal
  const centerPosition =
    navigationStarted && userLocation ? [userLocation.lat, userLocation.lng] : [lat, long];
  const initialZoom = navigationStarted && userLocation ? 12 : zoom;

  return (
    <div className="relative">
      {/* loading */}
      {locationLoading && (
        <div className="absolute bottom-0 left-0 z-[1000] bg-white bg-opacity-90 p-4 rounded-md m-4 shadow-md">
          <div className="flex items-center">
            <svg className="animate-spin h-5 w-5 mr-3 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Mendapatkan lokasi Anda...
          </div>
        </div>
      )}

      {/* error */}
      {locationError && (
        <div className="absolute bottom-0 left-0 z-[1000] bg-white bg-opacity-90 p-4 rounded-md m-4 shadow-md text-red-500 flex items-start justify-between gap-4">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {locationError}
          </div>
          <button onClick={() => setLocationError(null)} className="text-sm font-bold px-2 py-1 rounded hover:bg-gray-100">&times;</button>
        </div>
      )}

      {/* center button */}
      {isNavigation && navigationStarted && userLocation && (
        <div className="absolute bottom-0 right-0 z-[1000] bg-opacity-90 rounded-md m-4 shadow-md">
          <button
            onClick={() => {
              const map = markerRef.current?._map;
              if (map && userLocation) {
                map.flyTo([userLocation.lat, userLocation.lng], 16);
              }
            }}
            className="bg-white hover:bg-gray-100 hover:cursor-pointer text-gray-500 w-12 h-12 grid place-content-center rounded-md"
          >
            <i className="bi bi-crosshair text-2xl" />
          </button>
        </div>
      )}

      <MapContainer center={centerPosition} zoom={initialZoom} scrollWheelZoom={true}>
        <Recenter lat={centerPosition[0]} lng={centerPosition[1]} zoom={initialZoom} />

        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              attribution="Tiles &copy; Esri"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        <Marker position={[lat, long]} draggable={!!onMarkerDragEnd} eventHandlers={{ dragend: handleDragEnd }} ref={markerRef}>
          <Popup minWidth={400} maxWidth={400}>{customMarker || <MapPopup location={location} />}</Popup>
        </Marker>

        {navigationStarted && userLocation && (
          <>
            <Marker
              position={[userLocation.lat, userLocation.lng]}
              icon={L.divIcon({
                className: "current-location-marker",
                html: '<div class="pulse"></div>',
                iconSize: [20, 20],
                iconAnchor: [10, 10],
              })}
            >
              <Popup>Your current location</Popup>
            </Marker>

            <NavigationRoute
              key={`${destination.lat}-${destination.lng}`}
              userLocation={userLocation}
              destination={destination}
              maxAlternatives={maxAlternatives}
            />
          </>
        )}
      </MapContainer>

      <style>{`
        .current-location-marker .pulse {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(37,99,235,1);
          box-shadow: 0 0 0 0 rgba(37,99,235,0.4);
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(37,99,235,0.4); }
          70% { box-shadow: 0 0 0 12px rgba(37,99,235,0); }
          100% { box-shadow: 0 0 0 0 rgba(37,99,235,0); }
        }
      `}</style>
    </div>
  );
});

export default Map;
