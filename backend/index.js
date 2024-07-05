const express = require("express");

const PORT = 8000;

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the home page.");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
