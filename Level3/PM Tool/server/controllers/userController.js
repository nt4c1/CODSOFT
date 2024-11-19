import User from "../models/user.js";
import { createJWT } from "../utils/index.js";
import Notice from "../models/notification.js";
import bcrypt from "bcryptjs";

const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ status: false, message });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin, role, title } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return sendErrorResponse(res, 400, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin,
      role,
      title,
    });

    if (user) {
      if (isAdmin) createJWT(res, user._id);

      user.password = undefined;

      res.status(201).json({
        status: true,
        message: "User registered successfully",
        user,
      });
    } else {
      return sendErrorResponse(res, 400, "Invalid user data");
    }
  } catch (error) {
    console.error("Register User Error:", error);
    return sendErrorResponse(res, 500, "An error occurred while registering");
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return sendErrorResponse(res, 401, "Invalid email or password");
    }

    if (!user.isActive) {
      return sendErrorResponse(
        res,
        403,
        "User account is deactivated. Contact the administrator"
      );
    }

    createJWT(res, user._id);

    user.password = undefined;

    res.status(200).json({
      status: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return sendErrorResponse(res, 500, "An error occurred while logging in");
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      expires: new Date(0),
    });

    res.status(200).json({
      status: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout Error:", error);
    return sendErrorResponse(res, 500, "An error occurred while logging out");
  }
};

export const getTeamList = async (req, res) => {
  try {
    const users = await User.find().select("name title role email isActive");

    res.status(200).json({
      status: true,
      message: "Team list fetched successfully",
      users,
    });
  } catch (error) {
    console.error("Get Team List Error:", error);
    return sendErrorResponse(res, 500, "An error occurred while fetching team list");
  }
};

export const changeUserPassword = async (req, res) => {
  try {
    const { userId } = req.user;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return sendErrorResponse(res, 404, "User not found");
    }

    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return sendErrorResponse(res, 400, "Current password is incorrect");
    }

    user.password = await bcrypt.hash(newPassword, 12);

    await user.save();

    res.status(200).json({
      status: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change Password Error:", error);
    return sendErrorResponse(res, 500, "An error occurred while changing the password");
  }
};
