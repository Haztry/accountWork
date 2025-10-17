import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
// Serve static files for login and main pages
app.use(express.static(path.join(__dirname, "login")));
// app.use('/login', express.static(path.join(__dirname, 'login')));
app.use("/public", express.static(path.join(__dirname, "public")));

// Mount authRoutes under /api
app.use("/api", authRoutes);

// Route for login page (default)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login", "index.html"));
});

// Route for main page after login
// In a real app, you'd check if user is authenticated here
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

// const express = require('express');
// const path = require('path');

// const app = express();
// const PORT = 3000;

// // This line is the fix! It tells Express to serve static files
// // from the 'login' directory. Any request for a file (like 'style.css')
// // will now be handled correctly. The browser can now find your CSS.
// app.use(express.static(path.join(__dirname, 'login')));

// // This route serves your index.html for the root URL
// app.get('/', (req, res) => {
//   // It's a good practice to use path.join() for robust file paths
//   res.sendFile(path.join(__dirname, 'login', 'index.html'));
// });

// app.listen(PORT, () => {
//   console.log(`✅ Server running at http://localhost:${PORT}`);
// });
