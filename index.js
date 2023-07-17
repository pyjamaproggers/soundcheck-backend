import express from "express";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "https://statuesque-selkie-495af1.netlify.app", 
    credentials: true,
  }));
  
app.use(express.json());
app.use(cookieParser());
app.use("/postCoverImages", express.static("postCoverImages"));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./postCoverImages/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
    const file = req.file;
    const imageUrl = "/postCoverImages/" + file.filename;
    console.log(req);
    res.status(200).json({ imageUrl });
  });

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.listen(process.env.PORT, () => {
    console.log("Connected!");
});
