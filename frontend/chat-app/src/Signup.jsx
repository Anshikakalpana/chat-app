
import React, { useState } from "react";
import { authcheck } from "./patanhi/authEv";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNo: "", 
  });

  const { signup, isSigning } = authcheck();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData); // will now send phoneNo as well
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-purple-100">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5 px-2">
          {/* Full Name */}
          <div>
            <label className="block text-gray-600 mb-1 text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none hover:border-purple-400 transition"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 mb-1 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none hover:border-purple-400 transition"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-600 mb-1 text-sm font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none hover:border-purple-400 transition"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 mb-1 text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none hover:border-purple-400 transition"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-2 text-purple-500 hover:text-purple-700"
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSigning}
            className="w-full py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition duration-300"
          >
            {isSigning ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-5 text-sm">
          Already have an account?{" "}
          <a
            href="/loginemail"
            className="text-purple-600 font-medium hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
