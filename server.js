import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import { protectRoute } from "./middlewares/authMiddleware.js";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// 1️⃣ Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

// 2️⃣ Public route: login page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login", "index.html"));
});

// 4️⃣ Protected wildcard: all modules
// Protect all pages inside /modules
// Matches any path under /modules
app.get("/modules/{*splat}", protectRoute, (req, res) => {
  const requestedPage = req.params.splat; // e.g., "dashboard/index.html"
  const filePath = path.join(__dirname, "public/modules", requestedPage);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.warn("File not found:", filePath);
      res.status(404).send("Page not found");
    }
  });
});

// 3️⃣ Protected route: home
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home", "index.html"));
});
//  API routes
app.use("/api", authRoutes);

app.use("/receipt", express.static(path.join(__dirname, "receipt")));

// 6 Catch-all → redirect to login
app.use((req, res) => {
  res
    .status(404)
    .sendFile(path.join(__dirname, "public", "login", "index.html"));
});

app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
