import User from "../models/user.modle.js";
import bcrypt from "bcryptjs";
import { genratejwt } from "../utils/utils.js";
import cloudinary from "../lib/cloudanary.js";

//signup controller
export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    if (!fullname || !email || !password) {
      return;
      res.status(400).json({ message: "All fields are required." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    genratejwt(savedUser._id, res);

    //remove in production.
    console.log("User created successfully:", savedUser);

    return res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error("Error during signup:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

//signin controller
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User is not exists." });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid details." });
    }
    genratejwt(user._id, res);
    //remove in production.
    console.log("User signed in successfully:", user);
    return res.status(200).json({ message: "Signin successful." });
  } catch (error) {
    console.log("Error during signin:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

//logout controller
export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    //remove in production.
    console.log("User logged out successfully.");
    return res.status(200).json({ message: "Logout successful." });
  } catch (error) {
    console.error("Error during logout:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

//update profile controller
export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id; // Assuming user ID is stored in req.user after authentication

    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required." });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    //remove in production.
    console.log("Profile updated successfully:", user);
    return res.status(200).json({ message: "Profile updated successfully." });
  } catch (error) {
    console.log("Error updating profile:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

//check auth controller
export const checkAuth = (req, res) => {
  try {
    res.status(200).json({ user: req.user, message: "User is authenticated." });
  //remove in production.
  console.log("User authentication checked successfully:", req.user);
  } catch (error) {
    console.error("Error checking authentication-cheak:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};













/*


export const updateprofile = async (req, res) => {
  try {
    const { fullname, email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    user.fullname = fullname;
    await user.save();
    return res.status(200).json({ message: "Profile updated successfully." });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
}

*/
