import express from "express";
import { addPlaylist, removePlaylist, getPlaylists } from "../controllers/playlists.js";

const router = express.Router();

const setCorsHeaders = (req, res, next) => {
  res.set("Access-Control-Allow-Origin", ["https://statuesque-selkie-495af1.netlify.app", "http://localhost:3000"]); 
  res.set("Access-Control-Allow-Credentials", "true");
  next();
};

router.post("/deletePlaylist", setCorsHeaders, removePlaylist);
router.post("/addPlaylist", setCorsHeaders, addPlaylist);
router.get("/getPlaylist", setCorsHeaders, getPlaylists);

export default router;
