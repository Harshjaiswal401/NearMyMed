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

// ======================================
// FIX LEAFLET DEFAULT ICONS
// ======================================
delete (L.Icon.Default.prototype as any)
  ._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',

  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',

  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
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

        // 15KM RADIUS
        const radius = 15000;

        // OVERPASS QUERY
        const query = `
[out:json][timeout:25];
(
  node["amenity"="pharmacy"](around:${radius},${lat},${lon});
  way["amenity"="pharmacy"](around:${radius},${lat},${lon});
  relation["amenity"="pharmacy"](around:${radius},${lat},${lon});

  node["shop"="chemist"](around:${radius},${lat},${lon});
  way["shop"="chemist"](around:${radius},${lat},${lon});

  node["healthcare"="pharmacy"](around:${radius},${lat},${lon});
  way["healthcare"="pharmacy"](around:${radius},${lat},${lon});
);
out center;
`;

        const response = await fetch(
          'https://overpass-api.de/api/interpreter',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'text/plain',
            },

            body: query,
          }
        );

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

          const coords =
            `${latitude}-${longitude}`;

          if (
            !uniquePlaces.has(coords)
          ) {
            uniquePlaces.set(coords, {
              ...p,
              latitude,
              longitude,
            });
          }
        });

        // ======================================
        // FORMAT DATA
        // ======================================
        const enriched = Array.from(
          uniquePlaces.values()
        ).map(
          (
            p: any,
            index: number
          ) => {
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
                p.tags?.['addr:full'] ||
                'Nearby Pharmacy',

              distance: `${distance.toFixed(
                2
              )} km`,

              duration: `${Math.max(
                2,
                Math.round(
                  distance * 4
                )
              )} mins`,
            };
          }
        );

        // ======================================
        // SORT BY NEAREST
        // ======================================
        enriched.sort(
          (
            a: Pharmacy,
            b: Pharmacy
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

        setPharmacies(enriched);
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
      <div className="p-6 text-red-400">
        {error}
      </div>
    );
  }

  // ======================================
  // LOADING STATE
  // ======================================
  if (loading || !userLocation) {
    return (
      <div className="flex items-center gap-3 p-6 text-white">
        <div className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full" />

        <span>
          Searching nearby medical
          stores...
        </span>
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      {/* ====================================== */}
      {/* MAP */}
      {/* ====================================== */}
      <div className="rounded-2xl overflow-hidden mb-6 border border-white/10">
        <MapContainer
          center={userLocation}
          zoom={14}
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
                <div className="min-w-[220px]">
                  <h3 className="font-bold text-base">
                    {p.name}
                  </h3>

                  <p className="text-sm mt-1">
                    {
                      p.display_name
                    }
                  </p>

                  <div className="flex gap-3 mt-2 text-sm flex-wrap">
                    <span>
                      📍{' '}
                      {
                        p.distance
                      }
                    </span>

                    <span>
                      🚗{' '}
                      {
                        p.duration
                      }
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

      {/* ====================================== */}
      {/* EMPTY STATE */}
      {/* ====================================== */}
      {pharmacies.length === 0 && (
        <div className="text-center text-slate-400 mt-6">
          <p>
            No nearby pharmacies
            found.
          </p>

          <button
            onClick={() =>
              window.location.reload()
            }
            className="mt-4 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl"
          >
            Retry
          </button>
        </div>
      )}

      {/* ====================================== */}
      {/* LIST */}
      {/* ====================================== */}
      <div className="space-y-4">
        {pharmacies.map(
          (p, index) => (
            <div
              key={p.place_id}
              className="border border-white/10 rounded-2xl p-5 bg-black/20 backdrop-blur"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-bold text-lg">
                      {p.name}
                    </h3>

                    {index ===
                      0 && (
                      <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                        Nearest
                      </span>
                    )}
                  </div>

                  <p className="text-slate-400 text-sm mt-1">
                    {
                      p.display_name
                    }
                  </p>

                  <div className="flex gap-4 mt-3 text-sm flex-wrap">
                    <span>
                      📍{' '}
                      {
                        p.distance
                      }
                    </span>

                    <span>
                      🚗{' '}
                      {
                        p.duration
                      }
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lon}`,
                      '_blank'
                    );
                  }}
                  className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl flex items-center gap-2 transition"
                >
                  <Navigation size={16} />

                  Directions
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}