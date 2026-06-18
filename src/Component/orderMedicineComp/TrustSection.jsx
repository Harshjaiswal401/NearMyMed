export default function TrustSection() {
  return (
    <div className="grid md:grid-cols-4 gap-4 mt-8">
      {[
        "100% Genuine",
        "Fast Delivery",
        "Licensed Pharmacies",
        "Secure Payments"
      ].map((item) => (
        <div
          key={item}
          className="bg-white rounded-2xl p-5 text-center shadow-sm"
        >
          <div className="text-green-600 text-3xl mb-2">
            ✓
          </div>

          <p className="font-medium">{item}</p>
        </div>
      ))}
    </div>
  );
}