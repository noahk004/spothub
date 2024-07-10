const express = require("express");
const bodyParser = require("body-parser");

const path = require("path");
const https = require("https");
const fs = require("fs");
const authRouter = require("./routes/authRouter.js");
const dataRouter = require("./routes/dataRouter.js");

const { sessionMiddleware, checkCredentials } = require("./utils/session.js");
const { dbMiddleware } = require("./utils/db.js");
const { corsMiddleware } = require("./utils/config.js");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());

app.use(corsMiddleware);
app.use(sessionMiddleware);
app.use(dbMiddleware);

app.use("/api/auth", authRouter);
app.use("/api/", checkCredentials, dataRouter);

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
