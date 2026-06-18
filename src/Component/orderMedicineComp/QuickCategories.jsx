const categories = [
  "Pain Relief",
  "Diabetes",
  "Heart Care",
  "Vitamins",
  "Skin Care",
  "Cold & Flu"
];

export default function QuickCategories() {
  return (
    <div className="flex flex-wrap gap-3 mt-6">
      {categories.map((item) => (
        <button
          key={item}
          className="bg-white border px-4 py-2 rounded-full hover:bg-green-50"
        >
          {item}
        </button>
      ))}
    </div>
  );
}