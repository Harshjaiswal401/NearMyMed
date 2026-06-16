import StatsBar from "./StatsBar";
import OpenClosedLegend from "./OpenClosedLegend";

export default function MapPanel() {
  return (
    <div className="sticky top-24">

      <StatsBar />

      <div className="relative mt-4 bg-slate-200 rounded-3xl h-[700px] overflow-hidden">

        <div className="absolute top-4 right-4 z-10 bg-white px-4 py-2 rounded-xl shadow">
          Search this area
        </div>

        <div className="h-full flex items-center justify-center">
          MAP HERE
        </div>

        <OpenClosedLegend />

      </div>

    </div>
  );
}