import React, { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import { authcheck } from "./patanhi/authEv";

const Profile = () => {
  const { authUser, isUpdatingProfile, updateProfile, checkAuth } = authcheck();
  const [image, setImage] = useState("");

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

 const handleImage = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = async () => {
    setImage(reader.result);
    await updateProfile({
      newprofile: reader.result 
    });
  };

  reader.readAsDataURL(file);
};


  if (!authUser) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100">
        <p className="text-lg text-gray-600 animate-pulse">Loading user...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200 px-4 py-10">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 flex flex-col items-center text-center transition-transform hover:scale-[1.02] duration-300">
    
        <div className="relative group">
          <img
            src={image || authUser.profile || "/default-avatar.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-purple-500 shadow-md transition-transform duration-300 group-hover:scale-105"
          />
          <label className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-700 p-2 rounded-full cursor-pointer shadow-md transition-all">
            <Camera size={18} color="white" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
          </label>
        </div>

        {/* User Details */}
        <div className="mt-6 space-y-1">
          <h2 className="text-2xl font-semibold text-gray-800">
            {authUser.name || "Unnamed User"}
          </h2>
     
          <p className="text-gray-600">{authUser.phoneNo}</p>
        </div>

        <div className="mt-8 bg-gray-50 w-full rounded-xl p-5 text-sm text-gray-700 shadow-inner">
          <h3 className="font-semibold text-gray-800 mb-3">
            Account Information
          </h3>
          <div className="space-y-2">
            <p>
              <span className="font-medium text-gray-800">Email:</span>{" "}
              {authUser.email}
            </p>
            <p>
              <span className="font-medium text-gray-800">Phone:</span>{" "}
              {authUser.phoneNo}
            </p>
            <p>
              <span className="font-medium text-gray-800">Status:</span>{" "}
              <span
                className={`font-semibold ${
                  isUpdatingProfile ? "text-yellow-600" : "text-green-600"
                }`}
              >
                {isUpdatingProfile ? "Updating..." : "Active"}
              </span>
            </p>
          </div>
        </div>

        
        <button
          onClick={() => alert("Feature coming soon")}
          className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg focus:ring-4 focus:ring-purple-300"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
