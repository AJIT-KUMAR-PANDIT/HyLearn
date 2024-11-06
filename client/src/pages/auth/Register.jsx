import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";

const Register = () => {
  const navigate = useNavigate();
  const { btnLoading, registerUser } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("Student");

  const submitHandler = async (e) => {
    e.preventDefault();
    await registerUser(name, email, password, userType, navigate);
  };

  return (
    <div className="flex items-center justify-center h-[80vh] bg-black/80">
      <div className="bg-black/50 p-8 shadow-lg text-center w-80 hover:shadow-2xl transition-shadow bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <h2 className="text-2xl text-[#00ff1b] mb-4">Register</h2>
        <form onSubmit={submitHandler} className="text-left">
          <label htmlFor="name" className="block text-sm text-white mb-1">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-[#00ff1b] rounded-lg bg-black text-white placeholder-white"
          />

          <label htmlFor="email" className="block text-sm text-white mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-[#00ff1b] rounded-lg bg-black text-white placeholder-white"
          />

          <label htmlFor="password" className="block text-sm text-white mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-[#00ff1b] rounded-lg bg-black text-white placeholder-white"
          />

          <label htmlFor="userType" className="block text-sm text-white mb-1">
            Register as
          </label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full p-3 mb-4 border border-[#00ff1b] rounded-lg bg-black text-white"
          >
            <option value="Student">Student</option>
            <option value="Creator">Creator</option>
          </select>

          <button
            disabled={btnLoading}
            type="submit"
            className="bg-[#ff8d00] text-white py-2 px-6 rounded-lg w-full mt-4 transition-colors hover:bg-[#5f357e] disabled:opacity-50"
          >
            {btnLoading ? "Please Wait..." : "Register"}
          </button>
        </form>
        <p className="text-white mt-4">
          Have an account?{" "}
          <Link to="/login" className="text-[#04d2d2]">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
