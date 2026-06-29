import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Percent
} from "lucide-react";

export default function CartDrawer() {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    cartItemCount
  } = useCart();
  const navigate = useNavigate();

  if (!isCartDrawerOpen) return null;

  const deliveryFee = cartTotal > 0 ? 40 : 0;
  const grandTotal = cartTotal + deliveryFee;

  const handleCheckoutClick = () => {
    setIsCartDrawerOpen(false);
    navigate("/checkout");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay with blur */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
      ></div>

      {/* Slide-out Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col relative h-full">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                <ShoppingCart size={18} />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-800 text-base">Shopping Cart</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                  {cartItemCount} {cartItemCount === 1 ? "Item" : "Items"} Added
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="text-slate-400 hover:text-slate-600 hover:bg-slate-50 p-2 rounded-full transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center">
                  <ShoppingBag size={28} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 text-sm">Your cart is empty</h4>
                  <p className="text-xs text-slate-500 max-w-[200px] mx-auto leading-relaxed">
                    Browse our medicine catalog and add items to get started.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition"
                >
                  Start Ordering
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const discount = Math.round(((item.price - item.discountedPrice) / item.price) * 100);
                return (
                  <div
                    key={item.id}
                    className="flex gap-4 border border-slate-100 rounded-2xl p-4 bg-slate-50/50 hover:border-slate-200 transition duration-200"
                  >
                    {/* Mock Icon Box */}
                    <div className="w-16 h-16 bg-white border border-slate-200/60 rounded-xl flex items-center justify-center text-slate-400 shrink-0">
                      <span>💊</span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 space-y-1.5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1.5">
                          <h4 className="font-bold text-slate-800 text-sm truncate leading-snug" title={item.brandName}>
                            {item.brandName}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-rose-500 p-0.5 rounded-md transition shrink-0"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate" title={item.saltComposition}>
                          {item.saltComposition}
                        </p>
                      </div>

                      {/* Controls and pricing */}
                      <div className="flex items-center justify-between pt-1">
                        {/* Quantity adjusters */}
                        <div className="flex items-center gap-2 border border-slate-200 bg-white rounded-lg p-0.5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 flex items-center justify-center transition"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="text-xs font-bold text-slate-700 px-1 min-w-[12px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 flex items-center justify-center transition"
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        {/* Pricing details */}
                        <div className="text-right">
                          <span className="text-sm font-extrabold text-slate-800">
                            ₹{(item.discountedPrice * item.quantity).toFixed(2)}
                          </span>
                          {item.price > item.discountedPrice && (
                            <div className="text-[10px] text-slate-400 line-through">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Summary / Actions */}
          {cart.length > 0 && (
            <div className="border-t border-slate-100 p-6 bg-slate-50 space-y-4 shrink-0">
              
              {/* Savings callout banner */}
              <div className="bg-emerald-50/70 border border-emerald-100/60 rounded-xl p-3 flex items-center gap-2.5 text-xs text-emerald-800">
                <Percent size={14} className="text-emerald-600 shrink-0" />
                <span className="font-semibold">
                  You are saving on items in this order!
                </span>
              </div>

              {/* Price details */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-500">
                  <span>Cart Subtotal</span>
                  <span className="font-semibold text-slate-700">₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Delivery Charges</span>
                  <span className="font-semibold text-slate-700">₹{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="h-px bg-slate-200 my-2"></div>
                <div className="flex justify-between text-base font-extrabold text-slate-800">
                  <span>Total Amount</span>
                  <span className="text-emerald-600 text-lg">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-3">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/10 hover:shadow-emerald-600/20 transition flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  Proceed to Checkout
                  <ArrowRight size={15} />
                </button>
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <ShieldCheck size={12} className="text-emerald-500" />
                  Secure transactions only
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
