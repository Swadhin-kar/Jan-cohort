import { useState, Suspense } from "react";
// import LoadingFallback from "./LoadingFallback";
// import toast from 'react-hot-toast'
// import axios from 'axios'


const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // if(!(formData.password === formData.confirmPassword)){
    //   toast.error("Password and Confirm Password do not match");
    //   return 
    // }

    // axios.post('http://localhost:7000/user/signup', formData, {withCredentials: true})
    //   .then((res) => {
    //     if (res.data) {
    //       toast.success('Registered Successful')
    //     }

    //     setTimeout(() => {
    //       window.location.href = '/'
    //     }, 1500)
    //   }).catch((err) => {
    //     if (err.response) {
    //       console.log("Error is :", err);
    //       toast.error("Error :" + err.response.data.message)
    //     }
    //   })
  };
  return (
    <>
      <div className="">
      </div>
      <div className="min-h-screen flex items-center justify-center mt-15 p-4">
        {/* Card Container */}
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-2xl p-8 space-y-6">

            {/* Header */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Create Account
              </h1>
              <p className="text-slate-600 text-sm">
                Join FitBuddy today and start your fitness journey
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Name Field (Sign Up only) */}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-[#1d232a] focus:outline-none transition text-slate-900 placeholder-slate-400"
                  required
                />
              </div>

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

              {/* Confirm Password Field (Sign Up only) */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-[#1d232a] focus:outline-none transition text-slate-900 placeholder-slate-400"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#1d232a] to-[#5eddd4] text-slate-900 font-bold py-3 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 text-white"
              >
                Create Account
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
                Already have an account?
                <a
                  href="/user/login"
                  className="text-[#1d232a] font-bold hover:text-[#5eddd4] transition "
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-slate-500 text-xs mt-6">
            By continuing, you agree to FitBuddy's Terms & Conditions
          </p>
        </div>
      </div>
    </>
  )
}

export default Signup
