import { MdShoppingCart } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const toggleMenu = () => setMobileMenu(!mobileMenu);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-[#2B2B2B]">
      <div className="container flex py-4 w-full max-w-[1440px] mx-auto items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-2xl font-bold text-[#A259FF] font-heading">
          Carted
        </Link>

        <div className="flex items-center gap-3">
          <nav>
            <menu className="flex items-center gap-3 text-[#FFFFFF] font-body">
              <li>
                <Link
                  to="/products"
                  className="hidden md:inline-flex text-sm font-medium transition-colors hover:text-[#A259FF]"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="hidden md:inline-flex items-center justify-center rounded-lg bg-[#A259FF] px-4 py-2 text-sm font-medium transition-colors hover:bg-[#A259FF]/90"
                >
                  Login
                </Link>
              </li>
            </menu>
          </nav>
          <button className="hidden md:flex relative p-2 text-[#FFFFFF] hover:bg-[#3B3B3B] rounded-lg transition-colors">
            <MdShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#A259FF] text-xs flex items-center justify-center font-medium">
              0
            </span>
          </button>

          {/* Mobile burger menu */}
          <button
            className="md:hidden text-[#FFFFFF] p-2 hover:bg-[#3B3B3B] rounded-lg transition-colors"
            onClick={toggleMenu}
          >
            {mobileMenu ? (
              <FaXmark className="h-6 w-6" />
            ) : (
              <IoMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenu && (
        <div className="md:hidden border-t border-border bg-[#2B2B2B]">
          <nav>
            <menu className="cocntainer mx-auto px-4 py-6 flex flex-col gap-4 text-[#FFFFFF]">
              <li>
                <Link
                  to="/products"
                  className="text-base font-medium py-2 transition-colors hover:text-[#A259FF] flex w-full"
                  onClick={toggleMenu}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-base font-medium py-2 transition-colors hover:text-[#A259FF] flex items-center gap-2 w-full"
                  onClick={toggleMenu}
                >
                  <MdShoppingCart className="h-5 w-5" /> Cart{" "}
                  <span className="h-5 w-5 rounded-full flex items-center justify-center bg-[#A259FF] text-[#FFFFFF] text-xs font-medium">
                    0
                  </span>
                </Link>
              </li>
              <li className="pt-4 border-t border-border">
                <Link
                  to="/login"
                  className="w-full inline-flex items-center justify-center rounded-lg bg-[#A259FF] px-4 py-2 text-sm font-medium transition-colors hover:bg-[#A259FF]/90"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
              </li>
            </menu>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
