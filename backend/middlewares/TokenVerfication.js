 
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

const TokenVerfication = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    // Fallback to Authorization header (Bearer token)
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      } else {
        token = authHeader;
      }
    }

    // Fallback to x-access-token header
    if (!token && req.headers["x-access-token"]) {
      token = req.headers["x-access-token"];
    }

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized, please login" });
    }

    // Verify token properly
    const decoded = jwt.verify(token, process.env.SecriteKey);

    // Find user from decoded token
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Attach userId to request for future use
    req.userId = user._id;

    next();
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid or expired token" });
  }
};

export { TokenVerfication };
