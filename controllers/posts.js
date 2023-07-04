import jwt from "jsonwebtoken";
import { client } from "../db.js";

export const getPosts = async (req, res) => {
  try {
    const cat = req.query.cat;
    const collection = client.db().collection("posts");
    const query = cat ? { cat } : {};

    const data = await collection.find(query).toArray();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error executing query:", error);
    return res.status(500).json(error);
  }
};

export const getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const collection = client.db().collection("posts");

    const data = await collection.findOne({ _id: postId });
    if (!data) {
      return res.status(404).json("Post not found!");
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error executing query:", error);
    return res.status(500).json(error);
  }
};

export const addPost = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json("Not authenticated!");
    }

    jwt.verify(token, "jwtkey", async (err, userInfo) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }

      const collection = client.db().collection("posts");
      const post = {
        title: req.body.title,
        desc: req.body.desc,
        img: req.body.img,
        cat: req.body.cat,
        date: req.body.date,
        uid: userInfo.id,
      };

      await collection.insertOne(post);
      return res.json("Post has been created.");
    });
  } catch (error) {
    console.error("Error executing query:", error);
    return res.status(500).json(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json("Not authenticated!");
    }

    jwt.verify(token, "jwtkey", async (err, userInfo) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }

      const postId = req.params.id;
      const collection = client.db().collection("posts");

      const result = await collection.deleteOne({ _id: postId, uid: userInfo.id });
      if (result.deletedCount === 0) {
        return res.status(403).json("You can delete only your post!");
      }

      return res.json("Post has been deleted!");
    });
  } catch (error) {
    console.error("Error executing query:", error);
    return res.status(500).json(error);
  }
};

export const updatePost = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json("Not authenticated!");
    }

    jwt.verify(token, "jwtkey", async (err, userInfo) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }

      const postId = req.params.id;
      const collection = client.db().collection("posts");

      const updatedPost = {
        $set: {
          title: req.body.title,
          desc: req.body.desc,
          img: req.body.img,
          cat: req.body.cat,
        },
      };

      const result = await collection.updateOne({ _id: postId, uid: userInfo.id }, updatedPost);
      if (result.matchedCount === 0) {
        return res.status(403).json("You can update only your post!");
      }

      return res.json("Post has been updated.");
    });
  } catch (error) {
    console.error("Error executing query:", error);
    return res.status(500).json(error);
  }
};
