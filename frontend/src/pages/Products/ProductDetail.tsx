import { FaArrowLeft, FaRegStar, FaStar } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import type { IProductDetail } from "../../types/productDetail.types";
import { useNavigate, useParams } from "react-router-dom";
import { FaStarHalfAlt } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { useUser } from "../../context/user/UseUser";
import { getProductById, type IProduct } from "../../api/products";
import type { CartType } from "../../context/user/UserContext";
import { addCartItem } from "../../api/cartItem";
import { createCart } from "../../api/cart";
import { toast, ToastContainer } from "react-toastify";

const ProductDetail = () => {
  const { logginUser, activeCartId, setActiveCartId, setCart, cart} = useUser();

  const [product, setProduct] = useState<IProduct | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(logginUser);

    if (!id) return;

    const getProduct = async () => {
      const data = await getProductById(id);
      setProduct(data);
    };

    getProduct();
  }, [id]);

  const handleBack = () => {
    navigate("/products");
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#2B2B2B] py-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#FFFFFF] mb-4">
            Product not found
          </h1>
          <button
            onClick={handleBack}
            className="h-9 gap-2 text-base px-6 py-6 bg-[#A259FF] hover:bg-[#A259FF]/90 text-[#FFFFFF] inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all font-body"
          >
            <FaArrowLeft className="h-5 w-5" />
            Back to Products
          </button>
        </div>
      </div>
    );
  }

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
    const newQuantity = data.quantity 

    //add product to cart in useContext if there are existing items, then increase the quantity
    setCart((prev) => {
      const updatedCart = [...prev];

      //find matching product in cart
      const existingitem = updatedCart.find((item) => item._id === product._id);

      if (existingitem) {
        existingitem.quantity = newQuantity;
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
  };

  // useEffect(()=>{
  //   console.log(cart)
  // },[cart])

  return (
    <div className="min-h-screen bg-[#2B2B2B] py-8 sm:py-12 lg:py-16">
      <ToastContainer theme="colored" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm text-[#858584] hover:text-[#FFFFFF] transition-colors mb-8 font-body"
        >
          <FaArrowLeft className="h-4 w-4" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          {product.image ? (
            <div className="bg-[#3B3B3B] rounded-2xl overflow-hidden aspect-square">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="bg-[#3B3B3B] rounded-2xl overflow-hidden aspect-square flex justify-center items-center md:text-5xl text-xl font-body font-semibold text-[#858584]">
              No Image Provided
            </div>
          )}

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className="inline-block px-3 py-1 bg-[#3B3B3B] rounded-full text-sm text-[#858584] font-body">
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:5xl font-bold text-[#FFFFFF] font-heading">
              {product.title}
            </h1>

            <p className="text-lg text-[#858584] font-body">
              by <span className="text-[#FFFFFF]">{product.brand}</span>
            </p>

            {product.rating && (
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => {
                  const rating = product.rating;
                  const starIndex = i + 1;

                  if (!rating) return;

                  if (rating >= starIndex) {
                    return (
                      <FaStar key={i} className="h-5 w-5 text-[#858584]" />
                    );
                  }

                  if (rating >= starIndex - 0.5) {
                    return (
                      <FaStarHalfAlt
                        key={i}
                        className="h-5 w-5 text-[#858584]"
                      />
                    );
                  }

                  return (
                    <FaRegStar key={i} className="h-5 w-5 text-[#858584]" />
                  );
                })}
                <span className="text-[#858584] font-body ml-1">
                  {product.rating}
                </span>
              </div>
            )}

            <div className="py-4 border-t border-b border-[#3B3B3B]">
              <p className="text-4xl sm:text-5xl font-semibold text-[#A259FF] font-body">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#FFFFFF] font-heading">
                Description
              </h2>
              <p className="text-base leading-relaxed text-[#FFFFFF] font-body">
                {product.description}
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Add to cart logic
                  addCart(product);
                }}
                className="w-full sm:w-auto gap-2 text-base px-8 py-6 bg-[#A259FF] hover:bg-[#A259FF]/90 text-[#FFFFFF] font-medium transition-all hover:shadow-lg hover:shadow:[#A259FF]/20 font-body h-10 rounded-md inline-flex items-center justify-center"
              >
                <MdShoppingCart className="h-5 w-5" /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
