import { IoSearch } from "react-icons/io5";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { MdShoppingCart } from "react-icons/md";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/user/UseUser";
import { getAllProducts, type IProduct } from "../../api/products";
import { createCart } from "../../api/cart";
import { addCartItem } from "../../api/cartItem";
import type { CartType } from "../../context/user/UserContext";

const Products = () => {
  //Import and deconstruct useContext
  const { logginUser, activeCartId, setActiveCartId, setCart } = useUser();

  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    //Fetch products from api/product.ts
    const getProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };

    getProducts();
  }, []);

  const addCart = async (product: IProduct) => {
    const userId = logginUser?._id;
    let cartId = activeCartId ? activeCartId : "";

    //Check if user logined or nor
    if (!userId) {
      console.log("user does not exsit");
      toast.warning("Please log in");
      return;
    }

    //chekc id active cart exsit or not. If not then, create new cart
    if (!activeCartId) {
      const newCart = await createCart(userId);

      if (!newCart) {
        return;
      }

      //define carId
      cartId = newCart._id;
      //set Active cartId to useContext
      setActiveCartId(cartId);
    }

    //Add ptoductId to cartItem table
    const data = await addCartItem({ productId: product._id, cartId });

    if (!data) {
      console.log("Failed to add an item to cart");
      return;
    }

    const cartItemId = data._id;

    //add product to cart in useContext if there are existing items, then increase the quantity
    setCart((prev) => {
      const updatedCart = [...prev];

      //find matching product in cart
      const existingitem = updatedCart.find((item) => item._id === product._id);

      if (existingitem) {
        existingitem.quantity += 1;
      } else {
        const newItem: CartType = {
          ...product,
          quantity: 1,
          cartItemId,
        };
        updatedCart.push(newItem);
      }

      return updatedCart;
    });

    console.log("successfully added");

    useEffect(() => {
      console.log(logginUser);
    }, []);
    console.log("successfully added");
  };

  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#2B2B2B] py-16 sm:py-20 lg:py-24">
      <ToastContainer theme="colored" />
      <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#FFFFFF] font-heading">
            Products
          </h1>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <div className="relative">
              <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#858584]" />
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#3B3B3B] text-[#FFFFFF] placeholder:text-[#858584] rounded-lg pl-12 pr-4 py-3 border border-transparent focus:border-[#A259FF] focus:outline-none focus:ring-[#A259FF]/20 transition-all font-body"
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p._id}
              className="bg-[#3B3B3B] border border-border hover:border-[#A259FF]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#A259FF]/5 overflow-hidden group cursor-pointer rounded-xl flex flex-col"
            >
              <Link to={`/products/${p._id}`} className="flex-1 flex flex-col">
                {p.image ? (
                  <div className="aspect-square overflow-hidden bg-[#2B2B2B]">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="aspect-square overflow-hidden bg-[#2B2B2B] flex justify-center items-center">
                    <p className="text-xl font-body text-[#858584] font-semibold group-hover:scale-105 transition-transform duration-300">
                      No Image Provided
                    </p>
                  </div>
                )}

                <div className="p-4 sm:p-5 space-y-3">
                  <h3 className="text-base sm:text-lg font-bold text-[#FFFFFF] font-heading">
                    {p.title}
                  </h3>

                  {p.rating && (
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => {
                        const rating = p.rating;
                        const starIndex = i + 1;

                        if (rating && rating >= starIndex) {
                          return (
                            <FaStar
                              key={i}
                              className="h-4 w-4 text-[#858584]"
                            />
                          );
                        }

                        if (rating && rating >= starIndex - 0.5) {
                          return (
                            <FaStarHalfAlt
                              key={i}
                              className="h-4 w-4 text-[#858584]"
                            />
                          );
                        }

                        return (
                          <FaRegStar
                            key={i}
                            className="h-4 w-4 text-[#858584]"
                          />
                        );
                      })}
                      <span className="text-sm text-[#858584] font-body ml-1">
                        {p.rating}
                      </span>
                    </div>
                  )}

                  <p className="text-xl font-semibold text-[#A259FF] font-body">
                    ${p.price.toFixed(2)}
                  </p>
                </div>
              </Link>

              <div className="p-4 sm:p-5 pt-0">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Add to cart logic
                    addCart(p);
                  }}
                  className="w-full gap-2 bg-[#A259FF] hover:bg-[#A259FF]/90 text-[#FFFFFF] font-medium transition-all hover:shadow-lg hover:shadow-[#A259FF]/20 font-body cursor-pointer rounded-md inline-flex px-4 py-4 justify-center items-center"
                >
                  <MdShoppingCart className="h-5 w-5" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#858584] text-lg">
              No products found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
