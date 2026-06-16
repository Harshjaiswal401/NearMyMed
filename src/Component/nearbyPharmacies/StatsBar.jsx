export default function StatsBar() {
  return (
    <div className="bg-white border rounded-2xl p-5 flex justify-around">

      <div>
        <h3 className="text-2xl font-bold text-green-600">
          127
        </h3>
        <p className="text-sm">Pharmacies Found</p>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-green-600">
          24
        </h3>
        <p className="text-sm">Open Now</p>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-green-600">
          4.7
        </h3>
        <p className="text-sm">Average Rating</p>
      </div>

    </div>
  );
}