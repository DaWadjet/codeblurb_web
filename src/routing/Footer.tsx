import { FC } from "react";
import { Link } from "react-router-dom";

const Footer: FC = () => {
  return (
    <footer className="h-14 bg-gray-800 py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <p className="text-gray-300">
          &copy; 2024 CodeBlurb - All rights reserved
        </p>
        <nav className="text-gray-300">
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/"
                className="transition-all duration-200 hover:text-white"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="transition-all duration-200 hover:text-white"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="transition-all duration-200 hover:text-white"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="transition-all duration-200 hover:text-white"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="transition-all duration-200 hover:text-white"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
