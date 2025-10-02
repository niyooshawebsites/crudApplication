import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// Register controller

const registerController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "email is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "password is required",
      });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password format is invalid",
      });
    }

    // check if the user already exist
    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({
        success: false,
        message: "Registration Failed, Email is already exist",
      });
    }

    // encrypt the password
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    // initiate the new user and save it to the db

    const newUser = await new User({
      email,
      password: hashedPassword,
    }).save();

    return res.status(201).json({
      success: true,
      message: "Registration Successful",
      data: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      err: err.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "password is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email or Password is invalid",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "email or password is invalid",
      });
    }

    const userDetails = {
      id: user_id,
      email: user.email,
    };
    const authToken = await jwt.sign(userDetails, proces.env.JWT_SECRET, {
      expiresIn: 24 * 60 * 60 * 1000, // if you want expire in 1 hour then use 60*60*1000
    });

    res.cookie("authToken", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      message: 24 * 60 * 60 * 1000,
      path: "/",
    });
    return res.status(200).json({
      success: true,
      message: "LoggedIn Successful",
      data: { id: user._id, email: user.email },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      err: err.message,
    });
  }
};

export { registerController, loginController };
