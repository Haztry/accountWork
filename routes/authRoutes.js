import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// Demo user (in real life you'd query your DB)
const USER = {
  email: "franco@gmail.com",
  password: "franco123",
};

// POST /api/login
router.post("/login", (req, res) => {
  console.log("Received body:", req.body); // ✅ debug
  const { email, password } = req.body;

  if (email === USER.email && password === USER.password) {
    const token = jwt.sign({ email }, "my_secret_key", { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

export default router;
