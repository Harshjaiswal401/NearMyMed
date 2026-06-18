import { ShoppingCart } from "lucide-react";

export default function MedicineCard({ medicine }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden hover:shadow-lg transition">
      <img
        src={medicine.image}
        alt={medicine.name}
        className="h-44 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg">
          {medicine.name}
        </h3>

        <p className="text-green-600 mt-1">
          ✓ In Stock
        </p>

        <p className="text-sm text-gray-500">
          Available in {medicine.pharmacyCount} nearby pharmacies
        </p>

        <div className="mt-4 flex gap-2 items-center">
          <span className="font-bold text-xl">
            ₹{medicine.price}
          </span>

          <span className="line-through text-gray-400">
            ₹{medicine.mrp}
          </span>
        </div>

        <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl flex justify-center items-center gap-2">
          <ShoppingCart size={18} />
          Add To Cart
        </button>
      </div>
    </div>
  );
}