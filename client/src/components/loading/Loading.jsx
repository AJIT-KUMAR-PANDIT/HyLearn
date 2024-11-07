import React from "react";
import loader from "../../assets/loader.gif";
const Loading = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <img src={loader} alt="Loading" />
    </div>
  );
};

export default Loading;
