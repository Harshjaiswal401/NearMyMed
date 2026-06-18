export default function SavingsCard() {
  return (
    <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
      <h3 className="font-semibold text-green-700">
        🎉 You Saved ₹75 Today
      </h3>

      <p className="text-sm text-gray-600 mt-1">
        Add medicines worth ₹250 more to unlock free delivery.
      </p>
    </div>
  );
}