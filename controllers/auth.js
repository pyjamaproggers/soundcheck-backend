import jwt from "jsonwebtoken";
import client from "../db.js";
import dotenv from "dotenv";
dotenv.config();

export const login = async (req, res) => {
  try {
    const databaseName = "soundcheck";
    const collectionName = "soundcheckusers";

    // Specify the database
    const db = client.db(databaseName);
    
    const username = req.body.username;

    // Specify the collection
    const collection = db.collection(collectionName);
    
    const user = await collection.findOne({ username });

    if (!user) {
      return res.status(404).json("User not found!");
    }

    const isPasswordCorrect = req.body.password === user.password;

    if (!isPasswordCorrect) {
      return res.status(400).json("Wrong username or password!");
    }

    const token = jwt.sign({ id: user.id }, "jwtkey");
    console.log(token);
    const { password, ...other } = user;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false, // Set secure to false for localhost development
      })
      .status(200)
      .json(other);
  } catch (error) {
    console.error("Error executing query:", error);
    return res.status(500).json(error);
  }
};


export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};
