import React from "react";
import { useNavigate } from "react-router-dom";
import Testimonials from "../../components/testimonials/Testimonials";
import Logo from "../../components/Logo/Logo";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Home Section */}
      <div className="bg-[white] py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-5 md:text-3xl">
            Welcome to <Logo />A Online Learning Platform, For Learners.
          </h1>
          <p className="text-lg text-gray-600 mb-10 md:text-base">
            Elivate YourSelf...
          </p>
          <button
            onClick={() => navigate("/courses")}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Get Started
          </button>
        </div>
      </div>

      <Testimonials />
    </div>
  );
};

export default Home;
