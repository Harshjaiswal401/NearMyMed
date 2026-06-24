import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

export default function CartSummary() {
  const { cart, updateCartQuantity, removeFromCart, handleNavigation } = useAppContext();

  // Calculations
  const subtotal = cart ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0;
  const mrpTotal = cart ? cart.reduce((sum, item) => sum + item.mrp * item.quantity, 0) : 0;
  const discount = mrpTotal - subtotal;
  
  const deliveryThreshold = 500;
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= deliveryThreshold ? 0 : 40;
  const grandTotal = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (cart.length > 0) {
      handleNavigation("/payment");
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-sm p-6 border border-slate-100 flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-4 border border-slate-100">
          <ShoppingCart size={28} />
        </div>
        <h2 className="text-lg font-bold text-slate-800">Your Cart is Empty</h2>
        <p className="text-slate-500 text-sm mt-1 max-w-[200px]">
          Add medicines from our list to start your order.
        </p>
        <button 
          disabled
          className="w-full mt-6 bg-slate-100 text-slate-400 py-3 rounded-xl font-medium cursor-not-allowed text-sm"
        >
          Proceed To Checkout
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 border border-slate-100 flex flex-col">
      <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
        <span>Order Summary</span>
        <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-bold animate-pulse">
          {cart.reduce((sum, item) => sum + item.quantity, 0)} Items
        </span>
      </h2>

      {/* Cart Items List */}
      <div className="mt-5 space-y-4 max-h-[280px] overflow-y-auto pr-1 scrollbar-thin">
        {cart.map((item) => (
          <div key={item.id} className="flex gap-3 items-center py-2 border-b border-slate-50 last:border-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-12 object-cover rounded-xl border border-slate-100 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-slate-800 truncate">
                {item.name}
              </h4>
              <p className="text-xs text-slate-500">
                ₹{item.price} <span className="line-through text-slate-400">₹{item.mrp}</span>
              </p>
            </div>
            
            {/* Small Qty Selector */}
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50 shrink-0">
              <button
                onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                className="p-1 hover:bg-slate-100 text-slate-600 transition"
              >
                <Minus size={12} />
              </button>
              <span className="px-2 font-bold text-xs text-slate-700 min-w-[16px] text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                className="p-1 hover:bg-slate-100 text-slate-600 transition"
              >
                <Plus size={12} />
              </button>
            </div>

            {/* Remove Trash */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-slate-400 hover:text-red-500 transition p-1 shrink-0"
              aria-label="Remove item"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Price Details */}
      <div className="mt-5 space-y-3 pt-4 border-t border-slate-100 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Items Subtotal</span>
          <span>₹{mrpTotal}</span>
        </div>

        <div className="flex justify-between text-emerald-600 font-medium">
          <span>Medicines Discount</span>
          <span>-₹{discount}</span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Delivery Charges</span>
          <span>{deliveryFee === 0 ? <span className="text-emerald-600 font-semibold">FREE</span> : `₹${deliveryFee}`}</span>
        </div>
        
        {deliveryFee > 0 && (
          <p className="text-[11px] text-emerald-700 bg-emerald-50/50 p-2 rounded-lg mt-1 font-medium">
            💡 Add ₹{deliveryThreshold - subtotal} more for FREE delivery!
          </p>
        )}
      </div>

      <hr className="my-4 border-slate-100" />

      <div className="flex justify-between font-bold text-lg text-slate-800">
        <span>To Pay</span>
        <span>₹{grandTotal}</span>
      </div>

      <button
        onClick={handleCheckout}
        className="w-full mt-5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white py-3 rounded-xl font-semibold shadow-sm transition-all duration-200"
      >
        Proceed To Checkout
      </button>
    </div>
  );
}