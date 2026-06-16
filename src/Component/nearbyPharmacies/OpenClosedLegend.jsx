export default function OpenClosedLegend() {
  return (
    <div className="absolute bottom-4 left-4 bg-white rounded-xl px-4 py-2 flex gap-6 shadow">

      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        Open Now
      </div>

      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        Closed
      </div>

    </div>
  );
}