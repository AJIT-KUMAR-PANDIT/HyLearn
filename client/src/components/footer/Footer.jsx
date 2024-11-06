import React from "react";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillInstagram,
} from "react-icons/ai";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-5 text-center">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm mb-2">
          <Logo />
          <br />
          &copy; by{" "}
          <a
            href="https://ajitkumarpandit.nakprc.com"
            className="text-white hover:underline"
            target="_blank"
          >
            AJIT KUMAR PANDIT
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
