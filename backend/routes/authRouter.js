const express = require("express");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const users = req.db.collection("users");
    const user = await users.findOne({ email: email, password: password });
    if (user) {
      req.session.user = {
        isAuthenticated: true,
        id: user._id.toString()
      }
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

module.exports = router;
