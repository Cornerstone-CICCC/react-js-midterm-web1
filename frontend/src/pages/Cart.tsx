import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { LuTrash2 } from "react-icons/lu";
import { useUser } from "../context/user/UseUser";

const initialCartItems = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
    quantity: 1,
  },
  {
    id: 2,
    title: "Smart Watch",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",
    quantity: 2,
  },
  {
    id: 3,
    title: "Mechanical Keyboard",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=300&q=80",
    quantity: 1,
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const navigate = useNavigate();
  const { cart } = useUser();

  useEffect(() => {
    console.log(cart);
  }, []);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
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
                  key={item.id}
                  className="bg-[#3B3B3B] border border-border overflow-hidden rounded-xl"
                >
                  <div className="p-4 sm:p-6 flex gap-4 sm:gap-6">
                    {/* Image */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-[#2B2B2B]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-[#FFFFFF] mb-2 font-heading">
                          {item.title}
                        </h3>
                        <p className="text-lg sm:text-xl font-semibold text-[#A259FF] font-body">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center gap-3 mt-4">
                        <div className="flex items-center bg-[#3B3B3B] rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-2 hover:bg-[#2B2B2B] transition-colors"
                          >
                            <FaMinus className="h-4 w-4 text-[#FFFFFF]" />
                          </button>
                          <span className="px-4 text-[#FFFFFF] font-medium min-w-[3rem] text-center font-body">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
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
                        onClick={() => removeItem(item.id)}
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
                        key={item.id}
                        className="flex justify-between text-sm font-body"
                      >
                        <span className="text-[#858584]">
                          {item.title} x {item.quantity}
                        </span>
                        <span className="text-[#858584]">
                          ${(item.price * item.quantity).toFixed(2)}
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
