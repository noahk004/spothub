const express = require("express");
const { randomBytes } = require("node:crypto");
const router = express.Router();

const { toHash } = require("../utils/session.js");

router.post("/register", async (req, res) => {
  const { username, fName, lName, email, password } = req.body;
  if (!(username && fName && lName && email && password)) {
    res.status(400).send("One of the fields is missing.");
    return;
  }
  const salt = randomBytes(64).toString("base64");
  const hash = toHash(password, salt);
  const newUser = {
    email: email,
    username: username,
    fName: fName,
    lName: lName,
    password: hash,
    salt: salt,
  };
  try {
    const users = req.db.collection("users");

    const existingEmail = await users.findOne({ email: email });
    const existingUser = await users.findOne({ username: username });
    if (existingEmail) {
      res.status(409).send("Email address is already in use.");
      return;
    }
    if (existingUser) {
      res.status(409).send("Username is already in use.");
      return;
    }
    users.createIndex({ email: 1 }, { unique: true });
    users.createIndex({ username: 1 }, { unique: true });
    const result = await users.insertOne(newUser);
    if (result) {
      res.status(201).send("Account successfully created!");
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send("Something went wrong while inserting data into the database.");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    res.status(401).send("Missing email or password");
    return;
  }

  const users = req.db.collection("users");
  const user = await users.findOne({ email: email });
  if (!user) {
    res.status(401).json({ isAuthenticated: false });
    return;
  }
  const hash = toHash(password, user.salt);
  if (user.password === hash) {
    req.session.user = {
      isAuthenticated: true,
      userID: user._id.toString(),
      email: user.email,
      fName: user.fName,
      lName: user.lName,
    };
    console.log(`Successfully logged into ${user.email}`);
    res.status(200).json(req.session.user);
  } else {
    res.status(401).json({ isAuthenticated: false });
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

router.get("/check", async (req, res) => {
  if ("user" in req.session) {
    const sessions = req.db.collection("sessions");
    const data = await sessions.findOne({ _id: req.sessionID });
    if (data) {
      res.status(200).json(req.session.user);
      return;
    }
  }
  res.status(401).json({ isAuthenticated: false });
});

module.exports = router;
