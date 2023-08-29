import express from "express";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import playlistRoutes from "./routes/playlists.js"
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./postCoverImages/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Serve static files from the "postCoverImages" directory
app.use("/postCoverImages", express.static("postCoverImages"));

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  // Accessing the image details
  const originalname = file.originalname;
  const mimetype = file.mimetype;
  const destination = file.destination;
  const filename = file.filename;
  const path = file.path;
  const size = file.size;

  // Creating the full image URL
  const imageUrl = "https://soundcheck-backend.onrender.com/" + path;

  console.log("File Details:");
  console.log("Original Name:", originalname);
  console.log("Mimetype:", mimetype);
  console.log("Destination:", destination);
  console.log("Filename:", filename);
  console.log("Path:", path);
  console.log("Size:", size);

  res.status(200).json({ imageUrl });
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/playlists", playlistRoutes);

app.listen(process.env.PORT, () => {
  console.log("Connected!");
});
