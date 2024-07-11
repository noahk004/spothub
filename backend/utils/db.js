const { MongoClient, ServerApiVersion } = require("mongodb");

const dbMiddleware = (req, res, next) => {
  try {
    const client = new MongoClient(process.env.DB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
        ssl: true,
        tlsAllowInvalidCertificates: true,
      },
    });
    req.db = client.db("spothub");
    console.log("Successfully connected to 'spothub' database on MongoDB.");
  } catch (err) {
    console.log("Something went wrong while connecting to the database.");
  }

  next();
};

module.exports = { dbMiddleware };
