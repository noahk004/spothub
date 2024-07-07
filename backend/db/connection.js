const { MongoClient } = require("mongodb");
require("dotenv").config();

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

class MongoDBConnection {
  constructor() {
    this.client = null;
    this.db = null;
  }

  async connect() {
    if (this.db) {
      console.log('Already connected to the database');
      return this.db;
    }

    try {
      this.client = new MongoClient(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
      await this.client.connect();
      console.log('Connected to the database.');
      this.db = this.client.db('spothub');
      return this.db;
    } catch (error) {
      console.error('Failed to connect to the database.', error);
      throw error;
    }
  }

  async close() {
    if (this.client && this.client.isConnected()) {
      await this.client.close();
      console.log('Database connection closed');
      this.db = null;
      this.client = null;
    }
  }
}

const instance = new MongoDBConnection();
Object.freeze(instance);

module.exports = instance;

