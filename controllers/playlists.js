import jwt from "jsonwebtoken";
import client  from "../db.js";

export const getPlaylists = async (req, res) => {
  try {
        const cat = req.query.cat;
        const collection = client.db("soundcheck").collection("playlists");
        const query = cat ? { cat } : {};
        const data = await collection.find(query).toArray();
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error executing query:", error);
        return res.status(500).json(error);
    }
};

export const addPlaylist = async (req, res) => {
  console.log("ADding post")
  try {
    const token = req.cookies.access_token;
    // if (!token) {
    //   return res.status(401).json("Not authenticated!");
    // }

    jwt.verify(token, "jwtkey", async (err, userInfo) => {
      // if (err) {
      //   return res.status(403).json("Token is not valid!");
      // }

      const collection = client.db("soundcheck").collection("playlists");
      const post = {
        platform: req.body.platform,
        link: req.body.link,
        username: req.body.username,
      };

            await collection.insertOne(post);
            return res.json("Post has been created.");
        });
    } catch (error) {
        console.error("Error executing query:", error);
        return res.status(500).json(error);
    }
};

export const removePlaylist = async (req, res) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(401).json("Not authenticated!");
        }

        jwt.verify(token, "jwtkey", async (err, userInfo) => {
            if (err) {
                return res.status(403).json("Token is not valid!");
            }

      const link = req.params.link;
      const collection = client.db("soundcheck").collection("playlists");

            const result = await collection.deleteOne({ link: req.body.link });
            if (result.deletedCount === 0) {
                return res.status(403).json("You can delete only your post!");
            }

            return res.json("Playlist has been deleted!");
        });
    } catch (error) {
        console.error("Error executing query:", error);
        return res.status(500).json(error);
    }
};

