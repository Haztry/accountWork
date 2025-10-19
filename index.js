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
// app.use(express.static(path.join(__dirname, "login")));
// app.use('/login', express.static(path.join(__dirname, 'login')));
app.use(express.static(path.join(__dirname, "public")));

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
