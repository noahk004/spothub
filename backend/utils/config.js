const fs = require("fs");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const corsMiddleware = cors({
  origin: process.env.FRONTEND_URL,
  preflightContinue: true,
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",
});

const HTTPSOptions = {
  key: fs.readFileSync(path.join(__dirname, "../dev/private.key")),
  cert: fs.readFileSync(path.join(__dirname, "../dev/certificate.crt")),
};

module.exports = { corsMiddleware, HTTPSOptions };
