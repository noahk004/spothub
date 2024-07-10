const express = require("express");
const { randomBytes } = require("node:crypto");
const router = express.Router();

const { toHash } = require("../utils/session.js");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const users = req.db.collection("users");
    const user = await users.findOne({ email: email, password: password });
    if (user) {
      req.session.user = {
        isAuthenticated: true,
        id: user._id.toString(),
      };
      console.log(`Successfully logged into ${user.email}`);
      res.status(200).json({
        user: req.session.user,
      });
    } else {
      res.status(401).json({ isAuthenticated: false });
    }
  } else {
    res.status(401).send("Missing email or password");
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Failed to logout");
    }
    res.status(200).send("Successfully logged out.");
  });
});

router.post("/create-account", async (req, res) => {
  const { email, username, password } = req.body;
  if (!(email && username && password)) {
    res.status(400).send("One of the fields is missing.");
    return;
  }
  const salt = randomBytes(64).toString("base64");
  const hash = toHash(password, salt);
  const newUser = {
    email: email,
    username: username,
    password: hash,
    salt: salt,
  };
  try {
    const users = req.db.collection("users");
    const existingUser = await users.findOne({ email: email });
    if (existingUser) {
      res.status(409).send("Account for this user already exists!");
      return;
    }
    const result = await users.insertOne(newUser);
    if (result) {
      res.status(201).send("Account successfully created!");
    }
  } catch (err) {
    res
      .status(500)
      .send("Something went wrong while inserting data into the database.");
  }
});

module.exports = router;
