//So this middle weare makes the token usefull. so that login actually works and makes a correect sign in
import jwt from "jsonwebtoken";

export const protectRoute = (req, res, next) => {
  // console.log(req);
  // console.log(req);
  // console.log(next);
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN
  // console.log(token); // so it comes here and it's undefined. LOL // Omar was here .
  if (!token) {
    console.log("No token found");
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  try {
    console.log("im in middleware !");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Invalid token:", err.message);
    res.status(403).json({ message: "Forbidden: Invalid token" }); // Invalid token → back to login
  }
};
