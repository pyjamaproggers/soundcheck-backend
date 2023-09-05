import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  // Set CORS headers
  res.set("Access-Control-Allow-Origin", "https://statuesque-selkie-495af1.netlify.app/"); 
  res.set("Access-Control-Allow-Credentials", "true");
  next();
}, getPosts);

router.get("/:id", (req, res, next) => {
  // Set CORS headers
  res.set("Access-Control-Allow-Origin", "https://statuesque-selkie-495af1.netlify.app/"); 
  res.set("Access-Control-Allow-Credentials", "true");
  next();
}, getPost);

router.post("/", (req, res, next) => {
  // Set CORS headers
  res.set("Access-Control-Allow-Origin", "https://statuesque-selkie-495af1.netlify.app/");  
  res.set("Access-Control-Allow-Credentials", "true");
  next();
}, addPost);

router.delete("/:id", (req, res, next) => {
  // Set CORS headers
  res.set("Access-Control-Allow-Origin", "https://statuesque-selkie-495af1.netlify.app/"); 
  res.set("Access-Control-Allow-Credentials", "true");
  next();
}, deletePost);

router.put("/:id", (req, res, next) => {
  // Set CORS headers
  res.set("Access-Control-Allow-Origin", "https://statuesque-selkie-495af1.netlify.app/"); 
  res.set("Access-Control-Allow-Credentials", "true");
  next();
}, updatePost);

export default router;
