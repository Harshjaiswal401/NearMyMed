import { Phone, Navigation } from "lucide-react";

export default function PharmacyCard({ pharmacy }) {
  return (
    <div className="bg-white border rounded-2xl p-4">

      <div className="flex gap-4">

        <img
          src={pharmacy.image}
          alt={pharmacy.name}
          className="w-28 h-24 rounded-xl object-cover"
        />

        <div className="flex-1">

          <div className="flex justify-between">

            <div>
              <h3 className="font-bold text-xl">
                {pharmacy.name}
              </h3>

              <p className="text-green-600 text-sm">
                ⭐ {pharmacy.rating} ({pharmacy.reviews})
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold">
                {pharmacy.distance}
              </p>

              <p className="text-xs text-gray-500">
                away
              </p>
            </div>
          </div>

          <p className="mt-2 text-gray-500">
            {pharmacy.address}
          </p>

          <p className="mt-2 text-green-600 font-medium">
            Open till {pharmacy.openTill}
          </p>

          <div className="flex gap-2 mt-3 flex-wrap">
            {pharmacy.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-slate-100 px-3 py-1 rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-2 mt-4">

            <button className="border px-3 py-2 rounded-lg">
              <Phone size={16} />
            </button>

            <button className="bg-green-600 text-white px-3 py-2 rounded-lg">
              <Navigation size={16} />
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}