import jwt from "jsonwebtoken";

// 🔹 Simple access token verification
export const authMiddleware = (req, res, next) => {
  let token =
    req.cookies?.accesstoken ||
    (req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access token missing",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id: decoded._id, email: decoded.email };
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired access token",
    });
  }
};

/// ...existing code...
const isProd = process.env.NODE_ENV === "production";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.accesstoken;
  const refreshToken = req.cookies.refreshtoken;

  if (!token && !refreshToken) {
    return res.status(401).json({ success: false, message: "No tokens found" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (!err) {
      req.user = decoded;
      return next();
    }

    if (err.name === "TokenExpiredError" && refreshToken) {
      jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (refreshErr, refreshDecoded) => {
        if (refreshErr) {
          return res.status(403).json({ success: false, message: "Invalid refresh token" });
        }

        const newAccessToken = jwt.sign(
          { _id: refreshDecoded._id, email: refreshDecoded.email },
          process.env.JWT_SECRET,
          { expiresIn: "15m" }
        );

        res.cookie("accesstoken", newAccessToken, {
          httpOnly: true,
          sameSite: isProd ? "none" : "lax", // <<< lowercase & uses isProd
          secure: isProd,
          maxAge: 15 * 60 * 1000,
        });

        req.user = refreshDecoded;
        next();
      });
    } else {
      return res.status(403).json({ success: false, message: "Invalid token" });
    }
  });
};
// ...existing code...