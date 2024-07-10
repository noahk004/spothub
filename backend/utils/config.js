const cors = require("cors");
require('dotenv').config()

const corsMiddleware = cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
});

module.exports = { corsMiddleware };
