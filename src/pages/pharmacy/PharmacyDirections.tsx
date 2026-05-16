import { useEffect, useState } from 'react';
import { pharmacies as manualPharmacies } from '@/data/pharmacies';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';

import L from 'leaflet';

import { Navigation } from 'lucide-react';

import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// ======================================
// FIX LEAFLET DEFAULT ICONS
// ======================================

delete (L.Icon.Default.prototype as any)
  ._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// ======================================
// USER LOCATION ICON
// ======================================

const userIcon = new L.Icon({
  iconUrl:
    'https://cdn-icons-png.flaticon.com/512/64/64113.png',

  iconSize: [35, 35],

  iconAnchor: [17, 35],
});

// ======================================
// PHARMACY ICON
// ======================================

const pharmacyIcon = new L.Icon({
  iconUrl:
    'https://cdn-icons-png.flaticon.com/512/2776/2776067.png',

  iconSize: [32, 32],

  iconAnchor: [16, 32],

  popupAnchor: [0, -32],
});

// ======================================
// TYPES
// ======================================

type Pharmacy = {
  place_id: string;

  name: string;

  lat: string;

  lon: string;

  display_name: string;

  distance: string;

  duration: string;
};

// ======================================
// DISTANCE CALCULATION
// ======================================

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371;

  const dLat =
    ((lat2 - lat1) * Math.PI) / 180;

  const dLon =
    ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return R * c;
}

// ======================================
// AUTO FIT MAP
// ======================================

function FitBounds({
  pharmacies,
  userLocation,
}: any) {
  const map = useMap();

  useEffect(() => {
    if (
      !userLocation ||
      pharmacies.length === 0
    )
      return;

    const bounds = L.latLngBounds([
      userLocation,
      ...pharmacies.map((p: Pharmacy) => [
        parseFloat(p.lat),
        parseFloat(p.lon),
      ]),
    ]);

    map.fitBounds(bounds, {
      padding: [50, 50],
    });
  }, [pharmacies, userLocation, map]);

  return null;
}

// ======================================
// MAIN COMPONENT
// ======================================

export default function PharmacyDirections() {
  const [userLocation, setUserLocation] =
    useState<[number, number] | null>(
      null
    );

  const [pharmacies, setPharmacies] =
    useState<Pharmacy[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  // ======================================
  // GET USER LOCATION
  // ======================================

  useEffect(() => {
    if (!navigator.geolocation) {
      setError(
        'Geolocation is not supported'
      );

      setLoading(false);

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      },

      (error) => {
        console.error(error);

        setError(
          'Please allow location access'
        );

        setLoading(false);
      },

      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  // ======================================
  // FETCH PHARMACIES
  // ======================================

  useEffect(() => {
  if (!userLocation) return;

  const [lat, lon] = userLocation;

  const enriched = manualPharmacies.map((p) => {

    const pharmacyLat = parseFloat(p.lat);

    const pharmacyLon = parseFloat(p.lon);

    const distance = calculateDistance(
      lat,
      lon,
      pharmacyLat,
      pharmacyLon
    );

    return {
      ...p,

      distance: `${distance.toFixed(2)} km`,

      duration: `${Math.max(
        2,
        Math.round(distance * 4)
      )} mins`,
    };
  });

  enriched.sort(
    (a, b) =>
      Number(a.distance.replace(' km', '')) -
      Number(b.distance.replace(' km', ''))
  );

  setPharmacies(enriched);

  setLoading(false);

}, [userLocation]);

  // ======================================
  // ERROR STATE
  // ======================================

  if (error) {
    return (
      <div className="p-6 text-red-500">
        {error}
      </div>
    );
  }

  // ======================================
  // LOADING STATE
  // ======================================

  if (loading || !userLocation) {
    return (
      <div className="flex items-center gap-3 p-6 text-black dark:text-white">
        <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full" />

        <span>
          Searching nearby medical
          stores...
        </span>
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* ========================= */}
      {/* MAP SECTION */}
      {/* ========================= */}

      <div className="rounded-2xl overflow-hidden mb-6 border border-gray-200">

        <MapContainer
          center={userLocation}
          zoom={13}
          style={{
            height: '600px',
            width: '100%',
          }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* AUTO FIT */}
          <FitBounds
            pharmacies={pharmacies}
            userLocation={userLocation}
          />

          {/* USER LOCATION */}
          <Marker
            position={userLocation}
            icon={userIcon}
          >
            <Popup>
              Your Current Location
            </Popup>
          </Marker>

          {/* PHARMACY MARKERS */}
          {pharmacies.map((p) => (
            <Marker
              key={p.place_id}
              position={[
                parseFloat(p.lat),
                parseFloat(p.lon),
              ]}
              icon={pharmacyIcon}
            >
              <Popup>
                <div className="min-w-[220px] text-black">

                  <h3 className="font-bold text-base">
                    {p.name}
                  </h3>

                  <p className="text-sm mt-1">
                    {p.display_name}
                  </p>

                  <div className="flex gap-3 mt-2 text-sm flex-wrap">

                    <span>
                      📍 {p.distance}
                    </span>

                    <span>
                      🚗 {p.duration}
                    </span>

                  </div>

                  <button
                    onClick={() => {
                      window.open(
                        `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lon}`,
                        '_blank'
                      );
                    }}
                    className="mt-3 bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg flex items-center gap-2"
                  >
                    <Navigation size={16} />
                    Directions
                  </button>

                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* ========================= */}
      {/* PHARMACY LIST */}
      {/* ========================= */}

      <div className="space-y-4">

        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
          Nearby Pharmacies
        </h2>

        {pharmacies.length === 0 ? (
          <div className="bg-gray-100 rounded-2xl p-6 text-gray-600">
            No nearby pharmacies found
          </div>
        ) : (
          pharmacies.map((p) => (
            <div
              key={p.place_id}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-300"
            >
              <div className="flex justify-between items-start gap-4">

                {/* LEFT */}
                <div className="flex-1">

                  <h3 className="text-xl font-bold text-black">
                    {p.name}
                  </h3>

                  <p className="text-gray-600 mt-2">
                    {p.display_name}
                  </p>

                  <div className="flex flex-wrap gap-4 mt-4 text-sm">

                    <div className="bg-gray-100 px-3 py-1 rounded-full">
                      📍 {p.distance}
                    </div>

                    <div className="bg-gray-100 px-3 py-1 rounded-full">
                      🚗 {p.duration}
                    </div>

                  </div>
                </div>

                {/* RIGHT */}
                <button
                  onClick={() => {
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lon}`,
                      '_blank'
                    );
                  }}
                  className="bg-blue-600 hover:bg-blue-500 px-4 py-3 rounded-xl text-white flex items-center gap-2 whitespace-nowrap"
                >
                  <Navigation size={18} />
                  Directions
                </button>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}