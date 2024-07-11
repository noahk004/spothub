const { randomBytes, pbkdf2Sync } = require("node:crypto");
const session = require("express-session");
const MongoStore = require("connect-mongo");

require("dotenv").config();

const sessionMiddleware = session({
  secret: randomBytes(32).toString("hex"),
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
  store: MongoStore.create({
    mongoUrl: process.env.DB_URI,
    stringify: false,
    dbName: "spothub",
  }),
});

const checkCredentials = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    console.log(req.session.id);
    res.status(401).send("Login required.");
  }
};

const toHash = (password, salt) => {
  const iterations = 10000;
  const hash = pbkdf2Sync(password, salt, iterations, 128, "sha512");
  return hash.toString();
};

module.exports = { sessionMiddleware, checkCredentials, toHash };
