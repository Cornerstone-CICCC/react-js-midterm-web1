import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#3B3B3B]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex flex-col gap-2 justify-center items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-[#A259FF] font-heading"
          >
            Carted
          </Link>
          <p className="text-[#858584] text-sm sm:text-base">
            Everything You Want, Carted.
          </p>
          <div className="w-full h-px bg-border"></div>
          <p className="text-xs sm:text-sm text-[#858584]">
            &copy; 2026 Carted. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
