import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import { CourseData } from "../../context/CourseContext";

const Login = () => {
  const navigate = useNavigate();
  const { btnLoading, loginUser } = UserData();
  const { fetchMyCourse } = CourseData();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  // Handle form submission for email/password login
  const submitHandler = async (e) => {
    e.preventDefault();

    // const regex = new RegExp("^([w]*[w.]*(?!.)@gmail.com)");

    if (password.length === 6) {
      setPasswordErr(false);
    } else {
      setPasswordErr(true);
    }
    await loginUser(email, password, navigate, fetchMyCourse);
    // const regex = new RegExp("^[w.+-]+@gmail.com$");
    // console.log("regex ==========>" + regex.test(email));
    // if (regex.test(email)) {
    //   setError(false);
    //   await loginUser(email, password, navigate, fetchMyCourse);
    // } else {
    //   setError(true);
    // }
  };

  useEffect(() => {
    // Initialize Google Sign-In
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE,
      callback: handleGoogleSignIn,
    });

    // Render Google Sign-In button
    window.google.accounts.id.renderButton(
      document.getElementById("googleSignInButton"),
      { theme: "outline", size: "large", text: "signin_with" } // Customizes button text to "Sign in with Google"
    );
  }, []);

  // Handle Google Sign-In response
  const handleGoogleSignIn = async (response) => {
    const token = response.credential;
    // Decode the token to get user details (this assumes you’re using JWT format)
    const userObject = JSON.parse(atob(token.split(".")[1])); // Decodes Google ID token
    const googleEmail = userObject.email;

    // Auto-fill the email field with the Google email
    setEmail(googleEmail || "");
  };

  return (
    <div className="flex items-center justify-center h-[80vh] bg-black/80 ">
      <div className="bg-black/50 p-8 rounded-lg shadow-lg text-center w-80 hover:shadow-2xl transition-shadow bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <h2 className="text-2xl text-[#00ff1b] mb-4">Login</h2>

        <form onSubmit={submitHandler} className="text-left">
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

          {error ? (
            <div className="bg-[red] text-white font-extrabold text-xl">
              Only @gmail allowed
            </div>
          ) : (
            <></>
          )}

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

          {passwordErr ? (
            <div className="bg-[red] text-white font-extrabold text-xl">
              min 6 char allowed
            </div>
          ) : (
            <></>
          )}

          <button
            disabled={btnLoading}
            type="submit"
            className="bg-[#ff8d00] text-white py-2 px-6 rounded-lg w-full mt-4 transition-colors hover:bg-[#5f357e] disabled:opacity-50"
          >
            {btnLoading ? "Please Wait..." : "Login"}
          </button>
        </form>

        {/* Google Sign-In Button */}
        <div id="googleSignInButton" className="mt-4"></div>

        <p className="text-white mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#04d2d2]">
            Register
          </Link>
        </p>
        <p className="text-white mt-2">
          <Link to="/forgot" className="text-[#04d2d2]">
            Forgot password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
