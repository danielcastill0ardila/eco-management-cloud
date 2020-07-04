'use strict';
const MongoClient = require('mongodb').MongoClient;

let cachedDb = null;

async function connectToDatabase(uri, databaseName) {
  if (cachedDb) {
    console.log('=> using cached database instance', cachedDb);
    return cachedDb;
  }

  let client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  let database = client.db(databaseName);
  cachedDb = database;

  return cachedDb;
}

module.exports = connectToDatabase;
