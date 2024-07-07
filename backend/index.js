const express = require("express");
const session = require("express-session")
const https = require("https");
const fs = require("fs");
const path = require("path");
const MongoDBConnection = require("./db/connection.js");

const app = express();

require("dotenv").config();

const apiRouter = require("./routes/apiRouter.js");

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use("/api", apiRouter);

const gracefulShutdown = async () => {
  console.log("Received shutdown signal, closing MongoDB connection...");
  await MongoDBConnection.close();
  process.exit(0);
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

const options = {
  key: fs.readFileSync(path.join(__dirname, "/dev/private.key")),
  cert: fs.readFileSync(path.join(__dirname, "/dev/certificate.crt")),
};

https.createServer(options, app).listen(process.env.PORT, (err) => {
  if (err) {
    console.error("Failed to start HTTPS server:", err);
    process.exit(1);
  }
  console.log(`HTTPS server running on TCP port ${process.env.PORT}.`);
});
