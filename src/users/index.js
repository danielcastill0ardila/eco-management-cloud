const express = require('express');
const serverless = require('serverless-http');
const mongodb = require('../../shared/mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const { validateBody } = require('./helper');
const { validationResult } = require('express-validator');

//instance an express app
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const { MONGODB_URI = '' } = process.env;

app.get('/user', (req, res) => {
  res.status(200).send({
    name: 'ECO-Management cloud',
    path: '/user'
  });
});

app.post('/user', validateBody, (req, res) => {
  let user = req.body;

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  mongodb(MONGODB_URI).then(db =>
    db
      .collection('users')
      .insert(user)
      .then(createdUser => res.status(200).send(createdUser))
      .catch(err => {
        //put log error in cloudWatch
        console.log('Error, ', err.message);

        return res.send('Error occured');
      })
  );
});

module.exports.handler = serverless(app);
