const express = require("express");

const router = express.Router();

router.get("/data", async (req, res) => {
  const spotCollection = req.db.collection("spots");
  const cursor = spotCollection.find({ school: "UC Irvine" });
  const data = await cursor.toArray();

  res.status(201).json({ data });
});

module.exports = router;
