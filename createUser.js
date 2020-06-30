const mongodb = require('./handlerDB');

const { MONGODB_URI = '' } = process.env;

async function createUser(db) {
  console.log('=> query database');

  return db
    .collection('users')
    .find({})
    .toArray()
    .then(users => {
      return {
        statusCode: 200,
        body: JSON.stringify(users),
        headers: {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
        }
      };
    })
    .catch(err => {
      console.log('=> an error occurred: ', err);
      return { statusCode: 500, body: 'error' };
    });
}

const index = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await mongodb(MONGODB_URI)
    .then(db => createUser(db))
    .then(result => {
      console.log('=> returning result: ', result);
      callback(null, result);
    })
    .catch(err => {
      console.log('=> an error occurred: ', err);
      callback(err);
    });
};

module.exports = index;
