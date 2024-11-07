import React from "react";
import { MdDashboard } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Account = ({ user }) => {
  const { setIsAuth, setUser } = UserData();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out");
    navigate("/login");
  };

  return (
    <div>
      {user && (
        <div className="flex flex-col items-center justify-center w-[98vw] bg-white p-5 rounded-lg shadow-md md:w-[30%] mx-auto mt-32 sm:w-[80%] sm:mt-24">
          <center>
            <h2 id="my-profile" className="text-lg font-semibold">
              My Profile
            </h2>
          </center>
          <div className="text-left mt-4">
            <p className="mb-2 text-gray-800">
              <strong className="text-blue-600">Name - {user.name}</strong>
            </p>
            <p className="mb-2 text-gray-800">
              <strong className="text-blue-600">Email - {user.email}</strong>
            </p>
            <button
              onClick={() => navigate(`/${user._id}/dashboard`)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-700"
            >
              <span className="text-6xl">
                {" "}
                <MdDashboard />
              </span>
              Dashboard
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </button>
            {user.role === "admin" && (
              <button
                onClick={() => navigate(`/admin/dashboard`)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-700 ml-5 sm:ml-0"
              >
                <span className="text-6xl">
                  <MdDashboard />
                </span>
                Admin Dashboard
              </button>
            )}
          </div>
        </div>
      )}
      <button
        onClick={logoutHandler}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md mx-auto mt-4 mb-20 hover:bg-red-700"
      >
        <IoMdLogOut />
        Logout
      </button>
    </div>
  );
};

export default Account;
