import express from "express";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  console.log("UPLOAD ATTEMPT");
  console.log(req.body.file)
  if (!req.body.file) {
    // Handle error if no file is uploaded
    console.log("No File found")
    res.status(400).json({ error: "No file uploaded" });
    return;
  }
  
  const filename = req.body.file;
  console.log(filename);
  res.status(200).json({ filename: filename });
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.listen(8800, () => {
  console.log("Connected!");
});
