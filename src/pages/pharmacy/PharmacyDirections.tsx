import { useEffect, useState } from 'react';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';

import L from 'leaflet';

import { Navigation } from 'lucide-react';

import 'leaflet/dist/leaflet.css';

// FIX LEAFLET DEFAULT ICONS
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',

  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',

  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// PHARMACY ICON
const pharmacyIcon = new L.Icon({
  iconUrl:
    'https://cdn-icons-png.flaticon.com/512/4320/4320337.png',

  iconSize: [32, 32],
});

type Pharmacy = {
  place_id: string;
  name: string;
  lat: string;
  lon: string;
  display_name: string;
  distance?: string;
  duration?: string;
};

export default function PharmacyDirections() {
  const [userLocation, setUserLocation] = useState<
    [number, number] | null
  >(null);

  const [pharmacies, setPharmacies] = useState<
    Pharmacy[]
  >([]);

  const [loading, setLoading] = useState(true);

  // GET CURRENT LOCATION
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      },

      (error) => {
        console.error(
          'Location Error:',
          error
        );

        alert(
          'Please allow location access'
        );
      },

      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  // FETCH PHARMACIES
  useEffect(() => {
    if (!userLocation) return;

    const [lat, lon] = userLocation;

    async function fetchPharmacies() {
      try {
        const overpassQuery = `
[out:json];

(
  node["amenity"="pharmacy"](around:3000,${lat},${lon});
  way["amenity"="pharmacy"](around:3000,${lat},${lon});
  relation["amenity"="pharmacy"](around:3000,${lat},${lon});

  node["shop"="chemist"](around:3000,${lat},${lon});
  way["shop"="chemist"](around:3000,${lat},${lon});
  relation["shop"="chemist"](around:3000,${lat},${lon});
);

out center tags;
`;

        const response = await fetch(
          'https://overpass-api.de/api/interpreter',
          {
            method: 'POST',
            body: overpassQuery,
          }
        );

        const data = await response.json();

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

        const enriched: Pharmacy[] =
          data.elements.map(
            (
              p: any,
              index: number
            ) => {
              const pharmacyLat =
                p.lat ||
                p.center?.lat;

              const pharmacyLon =
                p.lon ||
                p.center?.lon;

              // SIMPLE DISTANCE
              const distance =
                Math.sqrt(
                  Math.pow(
                    pharmacyLat - lat,
                    2
                  ) +
                      Math.pow(
                        pharmacyLon - lon,
                        2
                      )
                );

              return {
                place_id:
                  p.id?.toString() ||
                  index.toString(),

                name:
                  p.tags?.name ||
                  'Medical Store',

                lat: pharmacyLat.toString(),

                lon: pharmacyLon.toString(),

                display_name:
                  p.tags?.[
                    'addr:full'
                  ] ||
                  p.tags?.name ||
                  'Nearby Pharmacy',

                distance: `${(
                  distance * 111
                ).toFixed(1)} km`,

                duration: `${Math.max(
                  2,
                  Math.round(
                    distance *
                      111 *
                      3
                  )
                )} mins`,
              };
            }
          );

        // SORT NEAREST FIRST
        enriched.sort(
          (
            a: Pharmacy,
            b: Pharmacy
          ) =>
            parseFloat(
              a.distance || '999'
            ) -
            parseFloat(
              b.distance || '999'
            )
        );

        setPharmacies(enriched);
      } catch (err) {
        console.error(
          'Overpass Error:',
          err
        );
      } finally {
        setLoading(false);
      }
    }

    fetchPharmacies();
  }, [userLocation]);

  // LOADING
  if (!userLocation || loading) {
    return (
      <div className="text-white p-6">
        Loading nearby pharmacies...
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      {/* MAP */}
      <div className="rounded-2xl overflow-hidden mb-6 border border-white/10">
        <MapContainer
          center={userLocation}
          zoom={14}
          style={{
            height: '350px',
            width: '100%',
          }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* USER LOCATION */}
          <Marker position={userLocation}>
            <Popup>
              Your Current Location
            </Popup>
          </Marker>

          {/* PHARMACIES */}
          {pharmacies.map((p) => (
            <Marker
              key={p.place_id}
              icon={pharmacyIcon}
              position={[
                Number(p.lat),
                Number(p.lon),
              ]}
            >
              <Popup>
                {p.name}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* EMPTY */}
      {pharmacies.length === 0 && (
        <div className="text-center text-slate-400 mt-6">
          No nearby pharmacies found.
        </div>
      )}

      {/* LIST */}
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

                {/* BUTTON */}
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