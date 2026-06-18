export default function CartSummary() {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 sticky top-24">
      <h2 className="text-xl font-bold">
        Order Summary
      </h2>

      <div className="mt-5 space-y-3">
        <div className="flex justify-between">
          <span>Items</span>
          <span>₹540</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>
          <span>₹40</span>
        </div>

        <div className="flex justify-between text-green-600">
          <span>Discount</span>
          <span>-₹75</span>
        </div>
      </div>

      <hr className="my-4" />

      <div className="flex justify-between font-bold text-xl">
        <span>Total</span>
        <span>₹505</span>
      </div>

      <button className="w-full mt-5 bg-green-600 text-white py-3 rounded-xl">
        Proceed To Checkout
      </button>
    </div>
  );
}