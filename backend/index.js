const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const https = require("https");
const fs = require("fs");
const authRouter = require("./routes/authRouter.js");
const dataRouter = require("./routes/dataRouter.js");

require("dotenv").config();
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))

const app = express();

app.use(
  session({
    secret: "some key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

app.use(bodyParser.json());

app.use("/api/auth", authRouter);
app.use(
  "/api/",
  (req, res, next) => {
    if (req.session.user) next();
    else {
      console.log(req.session.id);
      res.status(401).send("Login required.");
    }
  },
  dataRouter
);

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
