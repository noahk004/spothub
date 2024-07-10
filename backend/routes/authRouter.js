const express = require("express");

const router = express.Router();

const users = [
  { id: 'helloworld', email: 'noahk004@gmail.com', password: 'wonder123' },
  { id: 'someid', email: 'nkim9262@gmail.com', password: 'pass123' }
]

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = users.find(user => user.email === email && user.password === password)
    if (user) {
      req.session.user = user;
      console.log(req.session.id)
      res.status(200).send(`Successfully logged into ${user.email}`)
    } else {
      res.status(401).send("Incorrect email or password.")
    }
  } else {
    res.status(401).send("Missing email or password")
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
