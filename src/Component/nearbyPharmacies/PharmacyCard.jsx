import { Phone, Navigation, MapPin, Clock, Star, Truck, MessageSquare } from "lucide-react";

export default function PharmacyCard({ pharmacy }) {
  return (
    <div className={`bg-white border rounded-2xl p-5 hover:shadow-lg transition-all duration-300 flex flex-col ${!pharmacy.isOpen ? "opacity-70" : ""}`}>

      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Name */}
          <h3 className="font-bold text-slate-900 text-base leading-snug truncate">
            {pharmacy.name}
          </h3>

          {/* Area badge */}
          <div className="flex items-center gap-1 mt-1">
            <MapPin size={12} className="text-slate-400 shrink-0" />
            <span className="text-xs text-slate-400 truncate">{pharmacy.area}</span>
          </div>
        </div>

        {/* Open/Closed pill */}
        <div className="shrink-0">
          {pharmacy.is24Hours ? (
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">
              🌙 24 Hrs
            </span>
          ) : pharmacy.isOpen ? (
            <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">
              🟢 Open
            </span>
          ) : (
            <span className="bg-red-100 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full">
              🔴 Closed
            </span>
          )}
        </div>
      </div>

      {/* Address */}
      <p className="mt-2.5 text-slate-500 text-xs leading-relaxed line-clamp-2">
        {pharmacy.address}
      </p>

      {/* Stats row */}
      <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <Star size={12} className="text-amber-400 fill-amber-400" />
          <span className="font-semibold text-slate-700">{pharmacy.rating}</span>
          <span>({pharmacy.reviews.toLocaleString()})</span>
        </div>
        <div className="flex items-center gap-1">
          <Navigation size={12} className="text-slate-400" />
          <span>{pharmacy.distance}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={12} className="text-slate-400" />
          <span>{pharmacy.is24Hours ? "24 Hours" : `Till ${pharmacy.openTill}`}</span>
        </div>
      </div>

      {/* Service icons */}
      {(pharmacy.hasDelivery || pharmacy.hasOnlineConsult) && (
        <div className="mt-3 flex gap-2">
          {pharmacy.hasDelivery && (
            <span className="flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg font-medium">
              <Truck size={12} /> Delivery
            </span>
          )}
          {pharmacy.hasOnlineConsult && (
            <span className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg font-medium">
              <MessageSquare size={12} /> Online Consult
            </span>
          )}
        </div>
      )}

      {/* Tags */}
      <div className="flex gap-1.5 mt-3 flex-wrap">
        {pharmacy.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="text-xs bg-slate-100 text-slate-500 px-2.5 py-0.5 rounded-lg">
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
        <a
          href={`tel:${pharmacy.phone}`}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition"
        >
          <Phone size={15} />
          Call
        </a>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${pharmacy.lat},${pharmacy.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-medium transition"
        >
          <Navigation size={15} />
          Directions
        </a>
      </div>

    </div>
  );
}