export default function FilterChips() {
  const filters = [
    "All",
    "Open Now",
    "4+ Rating",
    "Home Delivery",
    "24 Hours",
    "More",
  ];

  return (
    <div className="flex gap-3 mt-4 flex-wrap">
      {filters.map((item) => (
        <button
          key={item}
          className="px-4 py-2 rounded-xl border bg-white"
        >
          {item}
        </button>
      ))}
    </div>
  );
}