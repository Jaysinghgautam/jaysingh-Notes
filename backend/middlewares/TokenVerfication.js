import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

const TokenVerfication = async (req, res, next) => {
  try {
    const secretKey =
      process.env.SecriteKey ||
      process.env.SECRET_KEY ||
      process.env.JWT_SECRET ||
      "jaysinghgautam";

    // Collect candidate tokens in priority order:
    // 1. Authorization header (Bearer token) - actively sent from frontend localStorage
    // 2. x-access-token header
    // 3. Cookie token
    const candidateTokens = [];

    if (req.headers.authorization) {
      const authHeader = req.headers.authorization;
      const bearerToken = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7).trim()
        : authHeader.trim();
      if (bearerToken && bearerToken !== "null" && bearerToken !== "undefined") {
        candidateTokens.push(bearerToken);
      }
    }

    if (req.headers["x-access-token"]) {
      const headerToken = String(req.headers["x-access-token"]).trim();
      if (headerToken && headerToken !== "null" && headerToken !== "undefined") {
        candidateTokens.push(headerToken);
      }
    }

    if (req.cookies?.token) {
      const cookieToken = String(req.cookies.token).trim();
      if (cookieToken && cookieToken !== "null" && cookieToken !== "undefined") {
        candidateTokens.push(cookieToken);
      }
    }

    if (candidateTokens.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized, please login" });
    }

    // Try candidates until one successfully verifies and matches a user
    let verifiedUser = null;

    for (const token of candidateTokens) {
      try {
        const decoded = jwt.verify(token, secretKey);
        if (decoded?.userId) {
          const user = await UserModel.findById(decoded.userId);
          if (user) {
            verifiedUser = user;
            break;
          }
        }
      } catch (err) {
        // Continue to check other tokens
        continue;
      }
    }

    if (!verifiedUser) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid or expired token",
      });
    }

    // Attach userId and user to request
    req.userId = verifiedUser._id;
    req.user = verifiedUser;

    next();
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid or expired token" });
  }
};

export { TokenVerfication };

