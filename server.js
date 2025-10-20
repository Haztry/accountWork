import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import { protectRoute } from "./middlewares/authMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Serve login page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login", "index.html"));
});

// Serve home page after login → protected
app.get("/home", protectRoute, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home", "index.html"));
});

// Serve static files (JS, CSS, modules)
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api", authRoutes);

// Catch-all → redirect to login
app.use((req, res) => {
  res
    .status(404)
    .sendFile(path.join(__dirname, "public", "login", "index.html"));
});

app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
