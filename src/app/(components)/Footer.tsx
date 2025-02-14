import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-gradient-to-b from-dark-layer-2 to-dark-yellow text-white text-center py-10 pt-10">
      {/* SVG Wave Background */}
      <div className="absolute top-0 left-0 w-full">
        
      </div>

      {/* Social Media Icons */}
      <div className="relative z-10 flex justify-center space-x-6 my-2">
        <a href="#" className="text-white text-2xl hover:text-gray-300 transition">
          <FaFacebook />
        </a>
        <a href="#" className="text-white text-2xl hover:text-gray-300 transition">
          <FaTwitter />
        </a>
        <a href="http://www.linkedin.com/in/sahil-srivastava-335a70227" target="_blank" className="text-white text-2xl hover:text-gray-300 transition">
          <FaLinkedin />
        </a>
        <a href="https://github.com/genius8855" target="_blank" className="text-white text-2xl hover:text-gray-300 transition">
          <FiGithub />
        </a>
      </div>

      {/* Navigation Links */}
      {/* <nav className="relative z-10 flex justify-center space-x-6 text-gray-200">
        <a href="#" className="hover:text-white transition">Home</a>
        <a href="#" className="hover:text-white transition">About</a>
        <a href="#" className="hover:text-white transition">Services</a>
        <a href="#" className="hover:text-white transition">Team</a>
        <a href="#" className="hover:text-white transition">Contact</a>
      </nav> */}

      {/* Copyright Text */}
      <p className="relative z-10 mt-4 text-gray-300">
        ©2024 Sahil Srivastava | All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
