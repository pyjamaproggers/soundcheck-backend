import express from "express";
import { login, logout } from "../controllers/auth.js";

const router = express.Router();

// Middleware to set CORS headers
const setCorsHeaders = (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "https://soundcheck-backend.onrender.com"); 
  res.set("Access-Control-Allow-Credentials", "true");
  next();
};

router.post("/login", setCorsHeaders, login);
router.post("/logout", setCorsHeaders, logout);

export default router;
