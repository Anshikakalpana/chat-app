import jwt from 'jsonwebtoken';

const authMiddleware = (req , res, next) => {
  let token;


  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  
  if (!token && req.cookies?.accesstoken) {
    token = req.cookies.accesstoken;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token is missing or invalid format',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) 
    req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

export default authMiddleware;