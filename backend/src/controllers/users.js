import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import cloudinary from "../lib/cloudinary.js";
//import redis from "../config/redis.js";


const setCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  };
};


const registerUser = async (req, res) => {
  try {
    const { email, password, phoneNo, name } = req.body;

    if (!email || !password || !phoneNo || !name) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please log in instead.",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashed,
      phoneNo,
      name, 
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { id: newUser._id, email: newUser.email, name: newUser.name },
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({
      success: false,
      message: err?.message || "Server Error",
    });
  }
};

const isProd = process.env.NODE_ENV === "production";
const loginUserByEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ success: false, message: "Invalid credentials" });

    const accesstoken = jwt.sign({ _id: user._id, email }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const refreshtoken = jwt.sign({ _id: user._id, email }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

    //await redis.sAdd(`refreshTokens:${email}`, refreshtoken);
    //await redis.expire(`refreshTokens:${email}`, 7 * 24 * 60 * 60);

    return res
     .cookie("accesstoken", accesstoken, {
    ...setCookieOptions(),
    maxAge: 15 * 60 * 1000,
  })
  .cookie("refreshtoken", refreshtoken, {
    ...setCookieOptions(),
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
      .json({
        success: true,
        message: "Login successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phoneNo: user.phoneNo,
          profilePic: user.profilePic || null,
        },
        accesstoken,
        refreshtoken,
      });
  } catch (err) {
    console.error("LoginByEmail Error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const loginUserByNumber = async (req, res) => {
  try {
    const { phoneNo, password } = req.body;
    if (!phoneNo || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ phoneNo });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const accesstoken = jwt.sign({ _id: user._id, phoneNo }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const refreshtoken = jwt.sign({ _id: user._id, phoneNo }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

   // await redis.sAdd(`refreshTokens:${phoneNo}`, refreshtoken);
    // await redis.expire(`refreshTokens:${phoneNo}`, 7 * 24 * 60 * 60);
return res
     .cookie("accesstoken", accesstoken, {
    ...setCookieOptions(),
    maxAge: 15 * 60 * 1000,
  })
  .cookie("refreshtoken", refreshtoken, {
    ...setCookieOptions(),
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
      .json({
        success: true,
        message: "Login successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phoneNo: user.phoneNo,
          profilePic: user.profilePic || null,
        },
        accesstoken,
        refreshtoken,
      });
  } catch (err) {
    console.error("LoginByNumber Error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ...existing code...
const refreshToken = async (req, res) => {
  try {
    const { refreshtoken } = req.cookies;
    if (!refreshtoken)
      return res.status(401).json({ success: false, message: "Missing refresh token" });

    const decoded = jwt.verify(refreshtoken, process.env.JWT_REFRESH_SECRET);

    // If you are not using Redis, skip redis checks
    // (remove or re-enable redis logic if you do use it)

    const isProd = process.env.NODE_ENV === "production";

    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email, phoneNo: decoded.phoneNo },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
    const newRefreshToken = jwt.sign(
      { id: decoded.id, email: decoded.email, phoneNo: decoded.phoneNo },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("accesstoken", newAccessToken, { httpOnly: true, secure: isProd, sameSite: isProd ? "none" : "lax" });
    res.cookie("refreshtoken", newRefreshToken, { httpOnly: true, secure: isProd, sameSite: isProd ? "none" : "lax" });

    return res.json({ success: true, accesstoken: newAccessToken });
  } catch (err) {
    console.error("RefreshToken Error:", err);
    res.clearCookie("accesstoken");
    res.clearCookie("refreshtoken");
    return res.status(403).json({ success: false, message: "Invalid or expired refresh token" });
  }
};
// ...existing code...


const updateProfile = async (req, res) => {
  try {
    const userId = req.user?._id; 
    if (!userId) {
      return res.status(401).json({ success: false, message: "Invalid user" });
    }

    let { newname, newprofile } = req.body;

   
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

   
    newname = newname || currentUser.name;
    newprofile = newprofile || currentUser.profile;
    
    const uploadResponse= await cloudinary.uploader.upload( newprofile)
 
    await User.findByIdAndUpdate(
      userId,
      { name: newname, profile: uploadResponse.secure_url },
      { new: true } 
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (err) {
    console.error("Update Profile Error:", err);
    return res.status(500).json({
      success: false,
      message: "Profile can't be updated",
      error: err.message,
    });
  }
};


const logout = async (req, res) => {
  try {
    const { refreshtoken } = req.cookies;
    if (!refreshtoken)
      return res.status(400).json({ success: false, message: "No token provided" });

    const decoded = jwt.verify(refreshtoken, process.env.JWT_REFRESH_SECRET);
    const key = decoded.email ? `refreshTokens:${decoded.email}` : `refreshTokens:${decoded.phoneNo}`;

    // await redis.sRem(key, refreshtoken);
    res.clearCookie("accesstoken");
    res.clearCookie("refreshtoken");

    return res.json({ success: true, message: "Logged out from this device" });
  } catch (err) {
    console.error("Logout Error:", err);
    return res.status(500).json({ success: false, message: "Logout failed" });
  }
};

const allDeviceLogout = async (req, res) => {
  try {
    const { refreshtoken } = req.cookies;
    if (!refreshtoken)
      return res.status(400).json({ success: false, message: "Invalid session" });

    const decoded = jwt.verify(refreshtoken, process.env.JWT_REFRESH_SECRET);
    const identifier = decoded.email || decoded.phoneNo;

    // await redis.del(`refreshTokens:${identifier}`);
    res.clearCookie("accesstoken");
    res.clearCookie("refreshtoken");

    return res.json({ success: true, message: "Logged out from all devices" });
  } catch (err) {
    console.error("AllDeviceLogout Error:", err);
    return res.status(500).json({ success: false, message: "Logout failed" });
  }
}

const checkUser = async (req, res) => {
  try {
    const id = req.user._id; 
    if (!id) {
      console.log("User not found");
      return res.status(400).json({ error: "User not found" });
    }

    const user = await User.findById(id).select("email name"); 

    if (!user) {
      return res.status(404).json({ error: "No user found with that ID" });
    }

    res.status(200).json({
      email: user.email,
      name: user.name,
    });

  } catch (err) {
    console.error(" Error checking user:", err);
    res.status(500).json({ error: "Server error while checking user" });
  }
};


export const userController = {
  registerUser,
  loginUserByEmail,
  loginUserByNumber,
  refreshToken, 
  logout,
  updateProfile,
  allDeviceLogout,
  checkUser
};
