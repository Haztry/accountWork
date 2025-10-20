//So this middle weare makes the token usefull. so that login actually works and makes a correect sign in
import jwt from "jsonwebtoken";

export const protectRoute = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) return res.redirect("/"); // Not logged in → back to login

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.redirect("/"); // Invalid token → back to login
  }
};
