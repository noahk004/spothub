const express = require("express");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.get("/get-something", upload.single("image"), async (req, res) => {
  console.log("req.file: " + req.file)
  res.json({ msg: "Hello!" })
});

module.exports = router;
