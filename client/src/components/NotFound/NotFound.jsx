import React from "react";
import { useNavigate } from "react-router-dom";
import notfound from "../../assets/notfound.svg";

const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer flex flex-col justify-center items-center text-2xl font-extrabold text-blue-700 mb-4 md:mb-0 min-h-screen"
    >
      <img src={notfound} alt="Page not found" className="max-w-xs mb-4" />
      <span>Click To Home</span>
    </div>
  );
};

export default NotFound;
