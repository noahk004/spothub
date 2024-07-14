const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const authRouter = require("./routes/authRouter.js");
const dataRouter = require("./routes/dataRouter.js");

const { sessionMiddleware, checkCredentials } = require("./utils/session.js");
const { dbMiddleware } = require("./utils/db.js");
const { corsMiddleware, HTTPSOptions } = require("./utils/config.js");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());

app.use(corsMiddleware);
app.use(sessionMiddleware);
app.use(dbMiddleware);

app.use("/api/auth", authRouter);
app.use("/api/", checkCredentials, dataRouter);

if (process.env.NODE_ENV === "development") {
  app.listen(process.env.PORT, () => {
    console.log(`HTTP server Listening on PORT ${process.env.PORT}`);
  });
} else if (process.env.NODE_ENV === "production") {
  https.createServer(HTTPSOptions, app).listen(process.env.PORT, (err) => {
    if (err) {
      console.error("Failed to start HTTPS server:", err);
      process.exit(1);
    }
    console.log(`HTTPS server running on TCP port ${process.env.PORT}.`);
  });
} else {
  throw new Error(
    "Node environment has not been configured. Please set NODE_ENV to development or production."
  );
}
