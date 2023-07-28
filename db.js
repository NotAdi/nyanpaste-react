const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.DB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connect() {
  try {
    await client.connect();
    console.log('---------->Connected to MongoDB<-------');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = { client, connect };
