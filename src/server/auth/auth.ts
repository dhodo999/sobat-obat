import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

const router = express.Router();

// Register Route
router.post("/register", async (req, res): Promise<any> => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Selesaikan semua form untuk mendaftar" });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email sudah terdaftar. Silahkan masuk." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "Registrasi berhasil! Silahkan masuk." });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ error: "Terjadi kesalahan server" });
  }
});

// Login Route
router.post("/login", async (req, res): Promise<any> => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Email atau password salah" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Email atau password salah" });
    }

    // Generate JWT Token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }
    const token = jwt.sign({ id: user._id }, secret, {
      expiresIn: "7d", // Token valid for 7 days
    });

    // Send success response
    res.json({
      message: "Login berhasil!",
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Terjadi kesalahan server" });
  }
});

export default router;
