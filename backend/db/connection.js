const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.DB_URI);

/**
 * _id
 * email (unique id)
 * first name
 * last name
 * username
 * password (hashed)
 * salt
 * bio
 * date created
 * starred_locations
 * saved_locations
 */

let _db;

async function connect() {
  
}

async function close() {

}

connectDB().catch(console.dir);
