import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authcheck } from "./patanhi/authEv";
import { Eye, EyeOff } from "lucide-react";

const Loginemail = () => {
  const navigate = useNavigate();

  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
   
  });
  const { loginemail, isLogging } = authcheck();

  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    await loginemail(formData); 
    navigate("/dashboard");     
  } catch (err) {
    setError(err.response?.data || "Login failed");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-purple-100">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Login with Email
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5 px-2">
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
              className="w-full px-4 py-2 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none hover:border-purple-400 transition duration-300"
              placeholder="Enter your email"
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
                className="w-full px-4 py-2 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none hover:border-purple-400 transition duration-300"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-2 text-purple-500 hover:text-purple-700"
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-gray-600 text-sm">Remember me</label>
          </div>

     
         <button
  type="submit"
  disabled={isLogging} 
  className="w-full py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition duration-300"
>
  {isLogging ? "Logging in..." : "Login"} 
</button>

        </form>

        <p className="text-center text-gray-600 mt-5 text-sm">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-purple-600 font-medium hover:underline"
          >
            Sign Up
          </a>
        </p>

             <p className="text-center text-gray-600 mt-5 text-sm">
         login with number?{" "}
          <a
            href="/loginnumber"
            className="text-purple-600 font-medium hover:underline"
          >
            Login Here
          </a>
        </p>
        
      </div>
    </div>
  );
};

export default Loginemail;
