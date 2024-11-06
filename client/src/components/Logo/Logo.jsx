import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/hylearn-logo.png";

const Logo = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer flex justify-center items-center text-2xl font-extrabold text-blue-700 mb-4 md:mb-0"
    >
      <img src={logo} alt="HyLearn Logo" className="mr-2 w-10 h-10" />
      HyLearn
    </div>
  );
};

export default Logo;
