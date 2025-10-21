import express from "express";
import jwt from "jsonwebtoken";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Demo user (in real life you'd query your DB)
const USER = {
  email: "franco@gmail.com",
  password: "franco123",
};

// Verify token route
router.get("/verify", protectRoute, (req, res) => {
  console.log("hey im in verify");
  res.json({ valid: true, user: req.user });
});

// POST /api/login
router.post("/login", (req, res) => {
  console.log("Received body:", req.body); // debug, aka show in console
  const { email, password } = req.body;

  if (email === USER.email && password === USER.password) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("im in yeah");
    console.log(token);
    res.json({ message: "Login successful", token });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

export default router;
