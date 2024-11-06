import React from "react";
import { Link, useParams } from "react-router-dom";
import background3 from "../../assets/background3.jpg";

const PaymentSuccess = ({ user }) => {
  const params = useParams();

  const backgroundStyle = {
    backgroundImage: `url('${background3}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "75vh",
  };

  return (
    <div className="flex items-center justify-center" style={backgroundStyle}>
      {user && (
        <div className="p-8 rounded-lg shadow-md text-center w-72 bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-80 border border-gray-100">
          <h2 className="text-2xl text-black mb-4">Payment successful</h2>
          <p className="text-lg text-black mb-5">
            Your course subscription has been activated
          </p>
          <p className="text-base text-black mb-5">
            Reference no - {params.id}
          </p>
          <Link
            to={`/${user._id}/dashboard`}
            className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300"
          >
            Go to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
