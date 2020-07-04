const express = require('express');
const serverless = require('serverless-http');
const mongodb = require('../../shared/mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

//instance an express app
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const { MONGODB_URI = '', DATABASE_NAME } = process.env;

app.get('/user', (req, res) => {
  res.status(200).send({
    name: 'ECO-Management cloud',
    path: '/user'
  });
});

app.post('/user', async (req, res) => {
  let user = req.body;

  try {
    let db = await mongodb(MONGODB_URI, DATABASE_NAME);
    let createdUser = await db.collection('users').insert(user);

    return res.send(createdUser);
  } catch (error) {
    //put log error in cloudwatch
    console.log('Error, ', error.message);
    return res.send('Error ocurred');
  }
});

module.exports.handler = serverless(app);
