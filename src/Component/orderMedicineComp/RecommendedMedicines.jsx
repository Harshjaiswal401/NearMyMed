const items = [
  "ORS",
  "Digene",
  "Crocin",
  "Vitamin C",
];

export default function RecommendedMedicines() {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">
        Recommended For You
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item}
            className="border rounded-xl p-4 text-center hover:border-green-500"
          >
            <div className="h-16 bg-slate-100 rounded-lg mb-3"></div>

            <h3 className="font-medium">{item}</h3>

            <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg">
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}