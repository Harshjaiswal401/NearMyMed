import { useEffect, useState } from 'react';

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

    async function fetchPharmacies() {
      try {
        setLoading(true);

        setError('');

        // 15 KM
        const radius = 15000;

        // Optimized Query
        const query = `
[out:json][timeout:20];

(
  node["amenity"="pharmacy"](around:${radius},${lat},${lon});
  way["amenity"="pharmacy"](around:${radius},${lat},${lon});

  node["shop"="chemist"](around:${radius},${lat},${lon});
  way["shop"="chemist"](around:${radius},${lat},${lon});
);

out body center;
`;

        // LOCALHOST / VERCEL
        const apiUrl =
          import.meta.env.DEV
            ? 'https://overpass-api.de/api/interpreter'
            : '/api/overpass';

        const response = await fetch(
          apiUrl,
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'text/plain',
            },

            body: query,
          }
        );

        if (!response.ok) {
          throw new Error(
            `API Error: ${response.status}`
          );
        }

        const data =
          await response.json();

        console.log(
          'OVERPASS DATA:',
          data
        );

        if (
          !data.elements ||
          data.elements.length === 0
        ) {
          setPharmacies([]);
          return;
        }

        // ======================================
        // REMOVE DUPLICATES
        // ======================================

        const uniquePlaces =
          new Map();

        data.elements.forEach((p: any) => {
          const latitude =
            p.lat || p.center?.lat;

          const longitude =
            p.lon || p.center?.lon;

          if (!latitude || !longitude)
            return;

          const key =
            p.tags?.name ||
            `${latitude}-${longitude}`;

          if (
            !uniquePlaces.has(key)
          ) {
            uniquePlaces.set(key, {
              ...p,
              latitude,
              longitude,
            });
          }
        });

        // ======================================
        // FORMAT DATA
        // ======================================

        const enriched: Pharmacy[] = Array.from(
  uniquePlaces.values()
)
  .map(
    (
      p: any,
      index: number
    ): Pharmacy | null => {

      const pharmacyLat =
        p.latitude;

      const pharmacyLon =
        p.longitude;

      const distance =
        calculateDistance(
          lat,
          lon,
          pharmacyLat,
          pharmacyLon
        );

      // FILTER > 15 KM
      if (distance > 15)
        return null;

      return {
        place_id:
          p.id?.toString() ||
          index.toString(),

        name:
          p.tags?.name ||
          p.tags?.brand ||
          'Medical Store',

        lat: pharmacyLat.toString(),

        lon: pharmacyLon.toString(),

        display_name:
          p.tags?.['addr:street'] ||
          p.tags?.['addr:suburb'] ||
          p.tags?.['addr:full'] ||
          'Nearby Pharmacy',

        distance: `${distance.toFixed(
          2
        )} km`,

        duration: `${Math.max(
          2,
          Math.round(distance * 4)
        )} mins`,
      };
    }
  )

  .filter(
    (
      item
    ): item is Pharmacy => item !== null
  );

        // ======================================
        // SORT BY DISTANCE
        // ======================================

        enriched.sort(
          (
            a: any,
            b: any
          ) =>
            Number(
              a.distance.replace(
                ' km',
                ''
              )
            ) -
            Number(
              b.distance.replace(
                ' km',
                ''
              )
            )
        );

        // LIMIT RESULTS
        setPharmacies(
          enriched.slice(0, 50)
        );

      } catch (err) {
        console.error(err);

        setError(
          'Failed to fetch nearby pharmacies'
        );
      } finally {
        setLoading(false);
      }
    }

    fetchPharmacies();

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