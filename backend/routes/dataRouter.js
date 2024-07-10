const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");

const router = express.Router();

router.get("/data", async (req, res) => {
  const client = new MongoClient(process.env.DB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  const db = client.db("spothub");
  const spotCollection = db.collection("spots");

  const cursor = spotCollection.find({ school: "UC Irvine" });

  const data = await cursor.toArray();

  console.log(req.session.id);
  res.status(201).json({ data });
});

module.exports = router;
