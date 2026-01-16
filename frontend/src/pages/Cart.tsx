import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { LuTrash2 } from "react-icons/lu";
import { useUser } from "../context/user/UseUser";
import {
  getCartItemByUserId,
  updateCartItem,
  deleteCartItem,
} from "../api/cartItem";
import type { ResultByUserId } from "../api/cartItem";
import { toast } from "react-toastify";

const Cart = () => {
  const [cartItems, setCartItems] = useState<ResultByUserId[]>([]);
  const navigate = useNavigate();
  const { logginUser, cart, setCart } = useUser();

  useEffect(() => {
    if (!logginUser?._id) return;

    const fetchCart = async () => {
      const data = await getCartItemByUserId(logginUser._id);
      setCartItems(data);
    };

    fetchCart();
  }, [logginUser]);

  const updateQuantity = async (cartItemId: string, delta: number) => {
    const target = cartItems.find((item) => item._id === cartItemId);
    if (!target) return;
    const newQuantity = Math.max(1, target.quantity + delta);
    const updated = await updateCartItem(cartItemId, newQuantity);
    if (!updated) return;

    setCartItems((items) =>
      items.map((item) =>
        item._id === cartItemId ? { ...item, quantity: newQuantity } : item,
      ),
    );

    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    );
  };

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const removeItem = async (cartItemId: string) => {
    await deleteCartItem(cartItemId);
    setCartItems((items) => items.filter((item) => item._id !== cartItemId));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.products.price * item.quantity,
    0,
  );

  const handleBack = () => {
    navigate("/products");
  };

  return (
    <div className="min-h-screen bg-[#2B2B2B] py-16 sm:py-20 lg:py-24">
      <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#FFFFFF] mb-12 font-heading">
          Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#858584] text-lg mb-4 font-body">
              Your cart is empty
            </p>
            <button
              onClick={handleBack}
              className="bg-[#A259FF] hover:bg-[#A259FF]/90 text-[#FFFFFF] font-body px-4 py-2 font-medium rounded-lg"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-[#3B3B3B] border border-border overflow-hidden rounded-xl"
                >
                  <div className="p-4 sm:p-6 flex gap-4 sm:gap-6">
                    {/* Image */}
                    {item.products.image ? (
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-[#2B2B2B]">
                          <img
                            src={item.products.image}
                            alt={item.products.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-[#2B2B2B] flex justify-center items-center">
                          <p className="font-body font-semibold text-[#858584]">
                            No Image
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-[#FFFFFF] mb-2 font-heading">
                          {item.products.title}
                        </h3>
                        <p className="text-lg sm:text-xl font-semibold text-[#A259FF] font-body">
                          ${item.products.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center gap-3 mt-4">
                        <div className="flex items-center bg-[#3B3B3B] rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item._id, -1)}
                            className="p-2 hover:bg-[#2B2B2B] transition-colors"
                          >
                            <FaMinus className="h-4 w-4 text-[#FFFFFF]" />
                          </button>
                          <span className="px-4 text-[#FFFFFF] font-medium min-w-[3rem] text-center font-body">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item._id, 1)}
                            className="p-2 hover:bg-[#2B2B2B] transition-colors"
                          >
                            <FaPlus className="h-4 w-4 text-[#FFFFFF]" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Delete btn */}
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => removeItem(item._id)}
                        className="p-2 text-[#858584] hover:text-red-400 transition-colors"
                      >
                        <LuTrash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#3B3B3B] border border-border overflow-hidden sticky top-20 rounded-xl">
                <div className="p-6 space-y-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] font-heading">
                    Order Summary
                  </h2>

                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="flex justify-between text-sm font-body"
                      >
                        <span className="text-[#858584]">
                          {item.products.title} x {item.quantity}
                        </span>
                        <span className="text-[#858584]">
                          ${(item.products.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4">
                    {/* Subtotal */}
                    <div className="flex justify-between mb-2 text-sm font-body">
                      <span className="text-[#858584]">Subtotal</span>
                      <span className="text-[#858584]">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    {/* Shipping */}
                    <div className="flex justify-between mb-4 text-sm font-body">
                      <span className="text-[#858584]">Shipping</span>
                      <span className="text-[#858584]">Free</span>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between text-lg pt-4 border-t border-border font-body">
                      <span className="text-[#FFFFFF] font-semibold">
                        Total
                      </span>
                      <span className="text-[#FFFFFF] font-semibold">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Checkout btn */}
                  <button className="w-full bg-[#A259FF] hover:bg-[#A259FF]/90 text-[#FFFFFF] font-medium py-3 rounded-lg transition-all hover:shadow-lg hover:shadow-[#A259FF]/20 font-body">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
