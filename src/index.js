const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const routesv1 = require('./routes/v1');

const app = express();

console.log('MONGO', process.env.MONGO);
// parse application/json
app.use(bodyParser.json());

routesv1(app);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to mongodb');
    app.listen(PORT, () => {
      console.log(`running on ${PORT}`);
    });
  })
  .catch(error => {
    console.log('mongodb error', error);
  });
