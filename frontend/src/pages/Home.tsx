import { AiOutlineShop } from "react-icons/ai";
import { FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import { LuSparkles, LuCreditCard } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="relative overflow-hidden bg-[#2B2B2B]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider mb-6 font-heading tracking-wider text-[#FFFFFF]">
              Everything You Want,{" "}
              <span className="text-[#A259FF]">Carted</span>.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#858584] mb-10 max-w-2xl mx-auto leading-relaxed font-body">
              Carted is a modern e-commerce platform built for effortless
              shopping. Browse products, add items to your cart, and check out
              with ease — all in a fast, responsive experience designed for
              today's users.
            </p>
            <Link
              to="/products"
              className="h-9 gap-2 text-base px-6 py-6 bg-[#A259FF] hover:bg-[#A259FF]/90 text-[#FFFFFF] inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all font-body"
            >
              Browse Products <AiOutlineShop className="h-5 w-5" />
            </Link>
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#A259FF] rounded-full blur-3xl opacity-10 pointer-events-none"></div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-[#2B2B2B]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="p-6 sm:p-8 bg-[#3B3B3B] border border-border hover:border-[#A259FF]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#A259FF]/5 rounded-xl">
              <div className="mb-6 flex items-center gap-3 p-3 rounded-xl bg-[#A259FF]/10 border border-[#A259FF]/20">
                <FiShoppingBag className="h-7 w-7 sm:h-8 sm:w-8 text-[#A259FF]" />
                <h3 className="text-lg sm:text-xl font-bold text-[#FFFFFF] font-heading">
                  Simple Shopping
                </h3>
              </div>
              <p className="text-[#858584] leading-relaxed text-sm sm:text-base font-body">
                Browse products effortlessly with a clean and intuitive
                interface.
              </p>
            </div>
            <div className="p-6 sm:p-8 bg-[#3B3B3B] border border-border hover:border-[#A259FF]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#A259FF]/5 rounded-xl">
              <div className="mb-6 flex items-center gap-3 p-3 rounded-xl bg-[#A259FF]/10 border border-[#A259FF]/20">
                <FiShoppingCart className="h-7 w-7 sm:h-8 sm:w-8 text-[#A259FF]" />
                <h3 className="text-lg sm:text-xl font-bold text-[#FFFFFF] font-heading">
                  Smart Cart
                </h3>
              </div>
              <p className="text-[#858584] leading-relaxed text-sm sm:text-base font-body">
                Add, remove, and manage items with real-time updates.
              </p>
            </div>
            <div className="p-6 sm:p-8 bg-[#3B3B3B] border border-border hover:border-[#A259FF]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#A259FF]/5 rounded-xl">
              <div className="mb-6 flex items-center gap-3 p-3 rounded-xl bg-[#A259FF]/10 border border-[#A259FF]/20">
                <LuSparkles className="h-7 w-7 sm:h-8 sm:w-8 text-[#A259FF]" />
                <h3 className="text-lg sm:text-xl font-bold text-[#FFFFFF] font-heading">
                  Modern Experience
                </h3>
              </div>
              <p className="text-[#858584] leading-relaxed text-sm sm:text-base font-body">
                Fully responsive design built with modern web technologies.
              </p>
            </div>
            <div className="p-6 sm:p-8 bg-[#3B3B3B] border border-border hover:border-[#A259FF]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#A259FF]/5 rounded-xl">
              <div className="mb-6 flex items-center gap-3 p-3 rounded-xl bg-[#A259FF]/10 border border-[#A259FF]/20">
                <LuCreditCard className="h-7 w-7 sm:h-8 sm:w-8 text-[#A259FF]" />
                <h3 className="text-lg sm:text-xl font-bold text-[#FFFFFF] font-heading">
                  Seamless Checkout
                </h3>
              </div>
              <p className="text-[#858584] leading-relaxed text-sm sm:text-base font-body">
                Review your cart, see totals instantly, and move through
                checkout with ease.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg-py-24 bg-[#2B2B2B]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-heading tracking-wider text-[#FFFFFF]">
                Why Choose <span className="text-[#A259FF]">Carted</span>?
              </h2>
              <p className="text-base sm:text-lg text-[#858584] max-w-2xl mx-auto font-body">
                Built for modern shoppers who demand speed, simplicity, and
                style.
              </p>
            </div>
            <div className="p-6 sm:p-8 lg:p-12 bg-[#3B3B3B] border border-border shadow-lg rounded-xl">
              <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="p-1 rounded-full bg-[#A259FF]">
                      <FaCheck className="h-4 w-4 text-[#FFFFFF]" />
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-[#FFFFFF] font-body">
                    Lightning-fast performance with optimized React
                  </p>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="p-1 rounded-full bg-[#A259FF]">
                      <FaCheck className="h-4 w-4 text-[#FFFFFF]" />
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-[#FFFFFF] font-body">
                    Seamless shopping experience across all devices
                  </p>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="p-1 rounded-full bg-[#A259FF]">
                      <FaCheck className="h-4 w-4 text-[#FFFFFF]" />
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-[#FFFFFF] font-body">
                    Built with modern TypeScript for reliability
                  </p>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="p-1 rounded-full bg-[#A259FF]">
                      <FaCheck className="h-4 w-4 text-[#FFFFFF]" />
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-[#FFFFFF] font-body">
                    Clean, intuitive interface inspired by leading platforms
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
