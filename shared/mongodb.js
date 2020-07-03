'use strict';
const MongoClient = require('mongodb').MongoClient;

const { DATABASE_NAME = '' } = process.env;

let cachedDb = null;

async function connectToDatabase(uri) {
  if (cachedDb) {
    console.log('=> using cached database instance', cachedDb);
    return Promise.resolve(cachedDb);
  }

  return MongoClient.connect(uri).then(client => {
    let db = client.db(DATABASE_NAME);
    cachedDb = db;
    return cachedDb;
  });
}

module.exports = connectToDatabase;
