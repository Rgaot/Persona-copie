import bcrypt from "bcryptjs";

import User from "../models/user-model.js";
import generateToken from "../utils/generateToken.js";
import cloudinary from "../utils/cloudinary.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // check if credentials are correct
    if (!username || !email || !password)
      return res.status(400).json({ message: "Tous les champs sont requis" });
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Le mot de passe doit répondre aux critères" });

    // check if user already exists
    const user = await User.findOne({ email }).select("-password") || await User.findOne({ username }).select("-password");
    if (user)
      return res.status(400).json({ message: "Le nom du'utilisateur ou l'email est déjà utilisé" });
    
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create the new user
    const newUser = await User.insertOne(
      {
        username,
        email,
        password: hashedPassword,
      },
      { new: true },
    );

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profileImage: newUser.profileImage,
        createdAt: newUser.createdAt,
      });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exist
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Utilisateur non trouvée" });

    // check if credentials are correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Connexion invalide" });

    if (isPasswordCorrect) {
      generateToken(user._id, res);
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
        socialLinks: user.socialLinks,
      });
    }
  } catch (error) {
    console.log("Error in login controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const checkAuth = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(400).json({ message: "No user logged in." });
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
      createdAt: user.createdAt,
      socialLinks: user.socialLinks,
    });
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateProfileImage = async (req, res) => {
  try {
    const { profileImage } = req.body;
    const userId = req.user._id;

    if (!profileImage)
      return res.status(400).json({ message: "Profile Image is required" });

    const uploadResponse = await cloudinary.uploader.upload(profileImage);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profileImage: uploadResponse.secure_url,
      },
      { new: true },
    ).select("-password");

    await updatedUser.save();

    res.status(200).json({
      username: updatedUser.username,
      profileImage: updatedUser.profileImage,
      email: updatedUser.email,
      createdAt: updatedUser.createdAt,
      socialLink: updatedUser.socialLinks,
    });
  } catch (error) {
    console.log("Error in updateProfileImage controller ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
