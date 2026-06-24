import { ShoppingCart } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

export default function MedicineCard({ medicine }) {
  const { cart, addToCart, updateCartQuantity } = useAppContext();
  
  const cartItem = cart?.find((item) => item.id === medicine.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 border border-slate-100">
      <img
        src={medicine.image}
        alt={medicine.name}
        className="h-44 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg text-slate-800">
          {medicine.name}
        </h3>

        <p className="text-emerald-600 mt-1 font-medium text-sm flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          In Stock
        </p>

        <p className="text-xs text-slate-500 mt-1">
          Available in {medicine.pharmacyCount} nearby pharmacies
        </p>

        <div className="mt-4 flex gap-2 items-baseline">
          <span className="font-bold text-xl text-slate-900">
            ₹{medicine.price}
          </span>

          <span className="line-through text-gray-400 text-sm">
            ₹{medicine.mrp}
          </span>
          
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg ml-auto">
            Save ₹{medicine.mrp - medicine.price}
          </span>
        </div>

        {quantity === 0 ? (
          <button
            onClick={() => addToCart(medicine)}
            className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl flex justify-center items-center gap-2 font-medium transition-all duration-200 shadow-sm active:scale-[0.98]"
          >
            <ShoppingCart size={18} />
            Add To Cart
          </button>
        ) : (
          <div className="mt-4 flex items-center justify-between border border-emerald-200 rounded-xl overflow-hidden bg-emerald-50/50 h-[48px]">
            <button
              onClick={() => updateCartQuantity(medicine.id, quantity - 1)}
              className="w-14 h-full flex items-center justify-center text-emerald-700 hover:bg-emerald-100 font-bold transition select-none text-xl"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="font-bold text-emerald-800 text-base text-center">
              {quantity}
            </span>
            <button
              onClick={() => updateCartQuantity(medicine.id, quantity + 1)}
              className="w-14 h-full flex items-center justify-center text-emerald-700 hover:bg-emerald-100 font-bold transition select-none text-xl"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}