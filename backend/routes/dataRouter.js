const express = require("express");

const router = express.Router();

router.get("/data", (req, res) => {
  console.log(req.session.id)
  res.status(201).send(
    `Displaying session data: ${req.session.user.email}, ${req.session.user.password}`
  );
});

module.exports = router;
