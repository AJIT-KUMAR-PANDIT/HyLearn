import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/api/user/reset?token=${params.token}`,
        {
          password,
        }
      );

      toast.success(data.message);
      navigate("/login");
      setBtnLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh] bg-black/80">
      <div className="bg-black/50 p-8 rounded-lg shadow-lg text-center w-80 hover:shadow-2xl transition-shadow bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <h2 className="text-2xl text-[#00ff1b] mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit} className="text-left">
          <label htmlFor="password" className="block text-sm text-white mb-1">
            Enter Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-[#00ff1b] rounded-lg bg-black text-white placeholder-white"
          />
          <button
            disabled={btnLoading}
            type="submit"
            className="bg-[#ff8d00] text-white py-2 px-6 rounded-lg w-full mt-4 transition-colors hover:bg-[#5f357e] disabled:opacity-50"
          >
            {btnLoading ? "Please Wait..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
