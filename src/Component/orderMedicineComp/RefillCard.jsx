export default function RefillCard() {
  return (
    <div className="bg-linear-to-r from-blue-500 to-cyan-500 text-white rounded-3xl p-6 mt-6">
      <h2 className="text-2xl font-bold">
        Monthly Refill Reminder
      </h2>

      <p className="mt-2">
        Never miss your regular medicines.
      </p>

      <button className="mt-4 bg-white text-blue-600 px-5 py-2 rounded-xl">
        Enable Auto Refill
      </button>
    </div>
  );
}