import { useState, Suspense } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import LoadingFallback from "./LoadingFallback";
import Navbar from "./Navbar";
import Footer from "./Footer";
// import axios from "../utils/axios";
// import toast from "react-hot-toast";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
  };

  const from = location.state?.from || '/'
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // try {
    //   const res = await axios.post(
    //     "/user/login",
    //     formData,
    //     { withCredentials: true }
    //   );

    //   toast.success("Login successful");
    //   setFormData({ email: "", password: "" });

    //   setTimeout(() => {
    //     navigate(from, { replace: false})
    //   }, 1000);
    // } catch (err) {
    //   toast.error(err?.response?.data?.message || "Login failed");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <>

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-2xl p-8 space-y-6">

            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-slate-600 text-sm">
                Sign in to your FitBuddy account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-[#1d232a] focus:outline-none transition text-slate-900 placeholder-slate-400"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-[#1d232a] focus:outline-none transition text-slate-900 placeholder-slate-400"
                  required
                />
              </div>

              <div className="text-right">
                <a href="#" className="text-sm text-[#1d232a] hover:text-[#5eddd4] transition font-medium">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#1d232a] to-[#5eddd4] text-slate-900 font-bold py-3 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 text-white"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center space-x-3">
              <div className="flex-1 h-px bg-slate-300"></div>
              <span className="text-sm text-slate-500">or</span>
              <div className="flex-1 h-px bg-slate-300"></div>
            </div>

            {/* Social Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 border-2 border-slate-300 text-slate-700 py-2 rounded-lg hover:border-[#1d232a] hover:text-[#1d232a] transition font-medium text-sm">
                <i className="fab fa-google mr-2"></i>Google
              </button>
              <button className="flex-1 border-2 border-slate-300 text-slate-700 py-2 rounded-lg hover:border-[#1d232a] hover:text-[#1d232a] transition font-medium text-sm">
                <i className="fab fa-facebook mr-2"></i>Facebook
              </button>
            </div>

            {/* Toggle Form */}
            <div className="text-center">
              <p className="text-slate-600 text-sm">
                Don't have an account?
                <a href="/user/signup"
                  className="text-[#1d232a] font-bold hover:text-[#5eddd4] transition "
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
