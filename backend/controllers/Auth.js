import UserModel from "../models/User.js"
import bycript from 'bcryptjs'
import jwt from 'jsonwebtoken'

const Register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const ExistingUser = await UserModel.findOne({ email });
    if (ExistingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }
    const hashPassword = await bycript.hashSync(password, 10);
    const NewUser = new UserModel({
      userName,
      email,
      password: hashPassword,
    });
    await NewUser.save();
    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: NewUser,
    });
  } catch (error) {
    console.error("Register error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const FindUser = await UserModel.findOne({ email: email.trim() });
    if (!FindUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const CheckPassword = await bycript.compare(password, FindUser.password);
    if (!CheckPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { userId: FindUser._id },
      process.env.SecriteKey,
      { expiresIn: "7d" }
    );

    // Set cookie for browsers that support cross-site cookies
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Return token in response body so client can use Authorization header
    return res.status(200).json({
      success: true,
      message: "User login successfully",
      user: FindUser,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const Logout = async (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
    });
    return res
      .status(200)
      .json({ success: true, message: "Logged out Successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const isLogin = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "User Not Logged In",
        user: null,
        isLoggedIn: false,
      });
    }
    return res.status(200).json({
      success: true,
      message: "User is Logged In",
      user,
      isLoggedIn: true,
    });
  } catch (error) {
    console.error("isLogin error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      isLoggedIn: false,
    });
  }
};

export { Register, Login, Logout, isLogin };