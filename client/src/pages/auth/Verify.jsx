import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import ReCAPTCHA from "react-google-recaptcha";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const { btnLoading, verifyOtp } = UserData();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  function onChange(value) {
    console.log("Captcha value:", value);
    setShow(true);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    await verifyOtp(Number(otp), navigate);
  };

  return (
    <div className="flex items-center justify-center h-[80vh] bg-black/80">
      <div className="bg-black/50 p-8 rounded-lg shadow-lg text-center w-80 hover:shadow-2xl transition-shadow bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <h2 className="text-2xl text-[#00ff1b] mb-4">Verify Account</h2>
        <form onSubmit={submitHandler} className="text-left">
          <label htmlFor="otp" className="block text-sm text-white mb-1">
            OTP
          </label>
          <input
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-[#00ff1b] rounded-lg bg-black text-white placeholder-white"
          />

          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={onChange}
            className="mb-4"
          />

          {show && (
            <button
              disabled={btnLoading}
              type="submit"
              className="bg-[#ff8d00] text-white py-2 px-6 rounded-lg w-full mt-4 transition-colors hover:bg-[#5f357e] disabled:opacity-50"
            >
              {btnLoading ? "Please Wait..." : "Verify"}
            </button>
          )}
        </form>
        <p className="mt-4 text-white">
          Go to{" "}
          <Link to="/login" className="text-[#ff8d00] hover:underline">
            Login
          </Link>{" "}
          page
        </p>
      </div>
    </div>
  );
};

export default Verify;
